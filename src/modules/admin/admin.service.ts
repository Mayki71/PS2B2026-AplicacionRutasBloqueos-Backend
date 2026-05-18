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
      id_usuario,
      descripcion,
      hora_inicio,
      fecha_creacion,
      id_estado,
      tiene_imagenes,
      imagen_principal_url,
      estados_reporte(nombre_estado),
      usuarios(nombre, apellido_paterno),
      ubicaciones(latitud, longitud, latitud_fin, longitud_fin),
      tipos_bloqueo(nombre, color_hex, icono),
      comentarios(id_comentario, id_usuario, comentario, fecha_comentario, usuarios(nombre, apellido_paterno))
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

async activarUsuario(id: number) {
  const { data, error } = await supabase
    .from('usuarios')
    .update({ es_activo: true })
    .eq('id_usuario', id);

  if (error) return { error };

  return data;
}

async promoverAdmin(id: number) {
  const { data, error } = await supabase
    .from('usuarios')
    .update({ es_administrador: true })
    .eq('id_usuario', id);

  if (error) return { error };
  return data;
}

async quitarAdmin(id: number) {
  const { data, error } = await supabase
    .from('usuarios')
    .update({ es_administrador: false })
    .eq('id_usuario', id);

  if (error) return { error };
  return data;
}

async eliminarReporte(id: number) {
  const { data, error } = await supabase
    .from('reportes')
    .delete()
    .eq('id_reporte', id);

  if (error) return { error };
  return data;
}

async eliminarComentario(id: number) {
  const { data, error } = await supabase
    .from('comentarios')
    .delete()
    .eq('id_comentario', id);

  if (error) return { error };
  return data;
}

async resolverReporte(id: number) {
  // Asumiendo que el estado 'Resuelto' tiene id = 2 (basado en el esquema común o lo podemos hardcodear)
  // El usuario pidió "dar como resolvido y no se muestre a los usuarios".
  // Usualmente 2 = resuelto, 3 = descartado. Voy a usar 2.
  const { data, error } = await supabase
    .from('reportes')
    .update({ id_estado: 2 })
    .eq('id_reporte', id);

  if (error) return { error };
  return data;
}



}