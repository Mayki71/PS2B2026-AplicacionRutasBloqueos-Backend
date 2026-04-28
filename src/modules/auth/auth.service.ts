import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { supabase } from '../../config/supabase.config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async register(dto: RegisterDto) {
    const { data, error } = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
    });

    if (error) throw new ConflictException(error.message);
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
      token: data.session?.access_token,
      usuario: {
        auth_id: data.user.id,
        email: data.user.email,
        nombre: dto.nombre,
        apellido_paterno: dto.apellido_paterno,
        apellido_materno: dto.apellido_materno,
      },
    };
  }

  async login(dto: LoginDto) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error)
      throw new UnauthorizedException('Email o contraseña incorrectos');

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

  async getMe(authId: string) {
    const { data: perfil, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', authId)
      .single();

    if (error || !perfil) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return perfil;
  }
}
