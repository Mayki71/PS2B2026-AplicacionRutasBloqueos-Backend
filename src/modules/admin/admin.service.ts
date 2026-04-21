import { Injectable } from '@nestjs/common';
import { supabase } from '../../config/supabase.config';

@Injectable()
export class AdminService {

  async getUsuarios() {
    const { data, error } = await supabase
      .from('usuarios')
      .select('*');

    if (error) {
      return { error };
    }

    return data;
  }

  async getReportes() {
  const { data, error } = await supabase
    .from('reportes')
    .select(`
      id_reporte,
      descripcion,
      hora_inicio,
      fecha_creacion,
      estados_reporte(nombre_estado),
      usuarios(nombre, apellido_paterno)
    `);

  if (error) return { error };

  return data;
}

async cambiarEstado(id: number, estado: number) {
  const { data, error } = await supabase
    .from('reportes')
    .update({ id_estado: estado })
    .eq('id_reporte', id);

  if (error) return { error };

  return data;
}


async desactivarUsuario(id: number) {
  const { data, error } = await supabase
    .from('usuarios')
    .update({ es_activo: false })
    .eq('id_usuario', id);

  if (error) return { error };

  return data;
}

}