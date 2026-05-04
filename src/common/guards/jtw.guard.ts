import {
  Injectable, CanActivate,
  ExecutionContext, UnauthorizedException,
} from '@nestjs/common';
import { supabase } from '../../config/supabase.config';

@Injectable()
export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException('Token requerido');

    const token = authHeader.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user)
      throw new UnauthorizedException('Token inválido o expirado');

    // Buscar el id_usuario entero usando el auth_id (UUID de Supabase Auth)
    const { data: usuarioDb } = await supabase
      .from('usuarios')
      .select('id_usuario')
      .eq('auth_id', data.user.id)
      .single();

    if (!usuarioDb) throw new UnauthorizedException('Usuario no registrado en el sistema');

    request.user = {
      ...data.user,
      id_usuario: usuarioDb.id_usuario,
    };

    return true;
  }
}