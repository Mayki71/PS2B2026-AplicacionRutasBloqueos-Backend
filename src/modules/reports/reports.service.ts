import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { supabase } from '../../config/supabase.config';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateVoteDto } from './dto/create-vote.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

// TODO: Cuando Samuel termine el módulo auth, reemplazar este valor
// por el id_usuario extraído del JWT en el guard
const TODO_USUARIO_HARDCODEADO = 1;

@Injectable()
export class ReportsService {


  // POST /reports — Crear reporte
  // Flujo: INSERT ubicaciones → INSERT reportes → (INSERT comentarios)

  async create(dto: CreateReportDto) {
    const id_usuario = TODO_USUARIO_HARDCODEADO;

    // 1. Insertar ubicación primero
    const { data: ubicacion, error: errorUbicacion } = await supabase
      .from('ubicaciones')
      .insert({
        latitud: dto.latitud,
        longitud: dto.longitud,
        direccion: dto.direccion ?? null,
        referencia: dto.referencia ?? null,
      })
      .select()
      .single();

    if (errorUbicacion) {
      throw new BadRequestException(`Error al guardar ubicación: ${errorUbicacion.message}`);
    }

    // 2. Insertar el reporte con la ubicación recién creada
    const { data: reporte, error: errorReporte } = await supabase
      .from('reportes')
      .insert({
        id_usuario,
        id_ubicacion: ubicacion.id_ubicacion,
        id_tipo_bloqueo: dto.id_tipo_bloqueo,
        id_estado: 1, // 1 = activo (estado por defecto)
        descripcion: dto.descripcion,
        hora_inicio: new Date().toISOString(),
        tiene_imagenes: !!dto.imagen_url,
        imagen_principal_url: dto.imagen_url ?? null,
      })
      .select()
      .single();

    if (errorReporte) {
      throw new BadRequestException(`Error al crear el reporte: ${errorReporte.message}`);
    }

    // 3. Si hay imagen, registrarla en imagenes_reportes
    if (dto.imagen_url) {
      await supabase.from('imagenes_reportes').insert({
        id_reporte: reporte.id_reporte,
        url_imagen: dto.imagen_url,
        es_principal: true,
        orden: 1,
      });
    }

    // 4. Si hay comentario inicial del creador, guardarlo
    if (dto.comentario_inicial?.trim()) {
      await supabase.from('comentarios').insert({
        id_reporte: reporte.id_reporte,
        id_usuario,
        comentario: dto.comentario_inicial.trim(),
      });
    }

    return reporte;
  }


  // GET /reports — Listar reportes activos
  // JOIN: ubicaciones + tipos_bloqueo + estados_reporte

  async findAll() {
    const { data, error } = await supabase
      .from('reportes')
      .select(`
        id_reporte,
        descripcion,
        hora_inicio,
        fecha_creacion,
        tiene_imagenes,
        imagen_principal_url,
        ubicaciones (
          id_ubicacion, latitud, longitud, direccion, referencia
        ),
        tipos_bloqueo (
          id_tipo_bloqueo, nombre, icono, color_hex
        ),
        estados_reporte (
          id_estado, nombre_estado
        )
      `)
      .eq('id_estado', 1) // 1 = activo
      .order('fecha_creacion', { ascending: false });

    if (error) {
      throw new BadRequestException(`Error al obtener reportes: ${error.message}`);
    }

    // Agregar conteo de votos a cada reporte
    const reportesConVotos = await Promise.all(
      data.map(async (reporte) => {
        const votos = await this.contarVotos(reporte.id_reporte);
        return { ...reporte, votos };
      }),
    );

    return reportesConVotos;
  }


  // GET /reports/:id — Detalle de un reporte
  async findOne(id: number) {
    const { data, error } = await supabase
      .from('reportes')
      .select(`
        id_reporte,
        descripcion,
        hora_inicio,
        fecha_creacion,
        tiene_imagenes,
        imagen_principal_url,
        ubicaciones (
          id_ubicacion, latitud, longitud, direccion, referencia
        ),
        tipos_bloqueo (
          id_tipo_bloqueo, nombre, icono, color_hex
        ),
        estados_reporte (
          id_estado, nombre_estado
        )
      `)
      .eq('id_reporte', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Reporte ${id} no encontrado`);
    }

    const votos = await this.contarVotos(id);
    return { ...data, votos };
  }


  // GET /reports/mis-reportes — Reportes del usuario actual
  // Pantalla "Tus Reportes" (Imagen 4 del Figma)
  async findMisReportes() {
    const id_usuario = TODO_USUARIO_HARDCODEADO;

    const { data, error } = await supabase
      .from('reportes')
      .select(`
        id_reporte,
        descripcion,
        hora_inicio,
        fecha_creacion,
        ubicaciones ( direccion, referencia ),
        tipos_bloqueo ( nombre )
      `)
      .eq('id_usuario', id_usuario)
      .order('fecha_creacion', { ascending: false });

    if (error) {
      throw new BadRequestException(`Error: ${error.message}`);
    }

    return data;
  }


  // POST /reports/:id/votar — Votar en un reporte
  async votar(id_reporte: number, dto: CreateVoteDto) {
    const id_usuario = TODO_USUARIO_HARDCODEADO;

    // Verificar si el usuario ya votó en este reporte
    const { data: votoExistente } = await supabase
      .from('votaciones')
      .select('id_votacion, id_tipo_voto')
      .eq('id_reporte', id_reporte)
      .eq('id_usuario', id_usuario)
      .single();

    if (votoExistente) {
      if (votoExistente.id_tipo_voto === dto.id_tipo_voto) {
        // Si vota lo mismo, elimina su voto (toggle)
        await supabase
          .from('votaciones')
          .delete()
          .eq('id_votacion', votoExistente.id_votacion);
        return { mensaje: 'Voto eliminado' };
      } else {
        // Si cambia de voto, actualiza
        await supabase
          .from('votaciones')
          .update({ id_tipo_voto: dto.id_tipo_voto })
          .eq('id_votacion', votoExistente.id_votacion);
        return { mensaje: 'Voto actualizado' };
      }
    }

    // Nuevo voto
    const { error } = await supabase.from('votaciones').insert({
      id_reporte,
      id_usuario,
      id_tipo_voto: dto.id_tipo_voto,
    });

    if (error) {
      throw new BadRequestException(`Error al votar: ${error.message}`);
    }

    return { mensaje: 'Voto registrado' };
  }


  // GET /reports/:id/comentarios — Obtener comentarios
  async getComentarios(id_reporte: number) {
    const { data, error } = await supabase
      .from('comentarios')
      .select(`
        id_comentario,
        comentario,
        fecha_comentario,
        es_editado,
        usuarios ( nombre, apellido_paterno )
      `)
      .eq('id_reporte', id_reporte)
      .order('fecha_comentario', { ascending: true });

    if (error) {
      throw new BadRequestException(`Error al obtener comentarios: ${error.message}`);
    }

    return data;
  }


  // POST /reports/:id/comentarios — Agregar comentario
  
  async addComentario(id_reporte: number, dto: CreateCommentDto) {
    const id_usuario = TODO_USUARIO_HARDCODEADO;

    // Verificar que el reporte existe
    await this.findOne(id_reporte);

    const { data, error } = await supabase
      .from('comentarios')
      .insert({
        id_reporte,
        id_usuario,
        comentario: dto.comentario.trim(),
      })
      .select(`
        id_comentario,
        comentario,
        fecha_comentario,
        usuarios ( nombre, apellido_paterno )
      `)
      .single();

    if (error) {
      throw new BadRequestException(`Error al agregar comentario: ${error.message}`);
    }

    return data;
  }


  // Helper privado — Contar votos agrupados por tipo

  private async contarVotos(id_reporte: number) {
    const { data } = await supabase
      .from('votaciones')
      .select('id_tipo_voto')
      .eq('id_reporte', id_reporte);

    if (!data) return { activo: 0, inactivo: 0, total: 0 };

    const activo = data.filter((v) => v.id_tipo_voto === 1).length;
    const inactivo = data.filter((v) => v.id_tipo_voto === 2).length;

    return { activo, inactivo, total: activo + inactivo };
  }

  async getTiposBloqueo() {
    const { data, error } = await supabase
      .from('tipos_bloqueo')
      .select('id_tipo_bloqueo, nombre, descripcion, icono, color_hex, requiere_imagen')
      .order('id_tipo_bloqueo', { ascending: true });

    if (error) {
      throw new BadRequestException(`Error al obtener tipos de bloqueo: ${error.message}`);
    }

    return data;
  }
}