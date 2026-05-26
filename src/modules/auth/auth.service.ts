import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { supabase } from '../../config/supabase.config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { MailService } from './mail/mail.service';
import { ResendVerificationDto } from './dto/resend-verification.dto';

const SITE_URL = process.env.SITE_URL;

@Injectable()
export class AuthService {
  constructor(private mailService: MailService) {}

  async register(dto: RegisterDto) {
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const emailExists = existingUsers?.users?.some(
      (u: any) => u.email === dto.email,
    );
    if (emailExists) {
      throw new ConflictException('Este correo ya está registrado');
    }

    const { data, error } = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        emailRedirectTo: `${SITE_URL}/verificado`,
      },
    });

    if (error) {
      // Supabase devuelve este mensaje cuando el email ya existe
      if (error.message.includes('User already registered')) {
        throw new ConflictException('Este correo ya está registrado');
      }
      throw new ConflictException(error.message);
    }
    if (!data.user) throw new ConflictException('No se pudo crear el usuario');

    const { error: profileError } = await supabase.from('usuarios').insert({
      auth_id: data.user.id,
      nombre: dto.nombre,
      apellido_paterno: dto.apellido_paterno,
      apellido_materno: dto.apellido_materno,
      es_activo: true,
      es_administrador: false,
      fecha_registro: new Date(),
    });

    if (profileError) {
      console.error('Error al insertar perfil:', profileError);
      throw new Error(profileError.message);
    }

    return {
      mensaje: 'Cuenta creada. Revisá tu correo para verificar tu cuenta.',
      email: dto.email,
      verificado: false,
    };
  }

  async login(dto: LoginDto) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        throw new UnauthorizedException('EMAIL_NOT_VERIFIED');
      }
      throw new UnauthorizedException('Email o contraseña incorrectos');
    }

    const { data: perfil } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', data.user.id)
      .single();

    console.log('Perfil obtenido:', perfil);

    return {
      token: data.session.access_token,
      usuario: {
        id: perfil?.id_usuario,
        auth_id: perfil?.auth_id,
        email: data.user.email,
        nombre: perfil?.nombre,
        apellido_paterno: perfil?.apellido_paterno,
        apellido_materno: perfil?.apellido_materno,
        es_activo: perfil?.es_activo,
        es_administrador: perfil?.es_administrador,
      },
    };
  }

  async resendVerification(dto: ResendVerificationDto) {
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users?.users?.find((u: any) => u.email === dto.email);

    if (!user)
      throw new NotFoundException('No existe una cuenta con ese email');
    if (user.email_confirmed_at) {
      throw new BadRequestException('Este email ya está verificado');
    }

    // Supabase envía el email solo
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: dto.email,
      options: {
        emailRedirectTo: `${SITE_URL}/verificado`,
      },
    });

    if (error) throw new Error(error.message);

    return { mensaje: 'Email de verificación reenviado correctamente' };
  }

  async getMe(authId: string) {
    const { data: perfil, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', authId)
      .single();

    if (error || !perfil) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const { data: authData } = await supabase.auth.admin.getUserById(authId);

    return {
      id: perfil.id_usuario,
      auth_id: perfil.auth_id,
      nombre: perfil.nombre,
      apellido_paterno: perfil.apellido_paterno,
      apellido_materno: perfil.apellido_materno,
      telefono: perfil.telefono,
      es_activo: perfil.es_activo,
      es_administrador: perfil.es_administrador,
      fecha_registro: perfil.fecha_registro,
      email: authData?.user?.email ?? '',
    };
  }
  async updateMe(authId: string, dto: UpdateProfileDto) {
    const { data: perfil, error } = await supabase
      .from('usuarios')
      .update({
        ...(dto.nombre && { nombre: dto.nombre }),
        ...(dto.apellido_paterno && { apellido_paterno: dto.apellido_paterno }),
        ...(dto.apellido_materno && { apellido_materno: dto.apellido_materno }),
        ...(dto.telefono && { telefono: dto.telefono }),
      })
      .eq('auth_id', authId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      id: perfil.id_usuario,
      auth_id: perfil.auth_id,
      nombre: perfil.nombre,
      apellido_paterno: perfil.apellido_paterno,
      apellido_materno: perfil.apellido_materno,
      telefono: perfil.telefono,
      es_activo: perfil.es_activo,
      es_administrador: perfil.es_administrador,
      fecha_registro: perfil.fecha_registro,
    };
  }
}
