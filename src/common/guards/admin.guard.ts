import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { supabase } from '../../config/supabase.config';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Set by JwtGuard

    if (!user) return false;

    // Verificar en la tabla de usuarios si es admin y está activo
    const { data: usuario, error } = await supabase
      .from('usuarios')
      .select('es_administrador, es_activo')
      .eq('auth_id', user.id)
      .single();

    if (error || !usuario) {
      throw new ForbiddenException('Usuario no encontrado en la base de datos');
    }

    if (!usuario.es_activo) {
      throw new ForbiddenException('Tu cuenta ha sido baneada o desactivada');
    }

    if (!usuario.es_administrador) {
      throw new ForbiddenException('No tienes permisos de administrador');
    }

    return true;
  }
}
