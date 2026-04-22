"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_config_1 = require("../../config/supabase.config");
const TODO_USUARIO_HARDCODEADO = 1;
let ReportsService = class ReportsService {
    async create(dto) {
        const id_usuario = TODO_USUARIO_HARDCODEADO;
        const { data: ubicacion, error: errorUbicacion } = await supabase_config_1.supabase
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
            throw new common_1.BadRequestException(`Error al guardar ubicación: ${errorUbicacion.message}`);
        }
        const { data: reporte, error: errorReporte } = await supabase_config_1.supabase
            .from('reportes')
            .insert({
            id_usuario,
            id_ubicacion: ubicacion.id_ubicacion,
            id_tipo_bloqueo: dto.id_tipo_bloqueo,
            id_estado: 1,
            descripcion: dto.descripcion,
            hora_inicio: new Date().toISOString(),
            tiene_imagenes: !!dto.imagen_url,
            imagen_principal_url: dto.imagen_url ?? null,
        })
            .select()
            .single();
        if (errorReporte) {
            throw new common_1.BadRequestException(`Error al crear el reporte: ${errorReporte.message}`);
        }
        if (dto.imagen_url) {
            await supabase_config_1.supabase.from('imagenes_reportes').insert({
                id_reporte: reporte.id_reporte,
                url_imagen: dto.imagen_url,
                es_principal: true,
                orden: 1,
            });
        }
        if (dto.comentario_inicial?.trim()) {
            await supabase_config_1.supabase.from('comentarios').insert({
                id_reporte: reporte.id_reporte,
                id_usuario,
                comentario: dto.comentario_inicial.trim(),
            });
        }
        return reporte;
    }
    async findAll() {
        const { data, error } = await supabase_config_1.supabase
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
            .eq('id_estado', 1)
            .order('fecha_creacion', { ascending: false });
        if (error) {
            throw new common_1.BadRequestException(`Error al obtener reportes: ${error.message}`);
        }
        const reportesConVotos = await Promise.all(data.map(async (reporte) => {
            const votos = await this.contarVotos(reporte.id_reporte);
            return { ...reporte, votos };
        }));
        return reportesConVotos;
    }
    async findOne(id) {
        const { data, error } = await supabase_config_1.supabase
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
            throw new common_1.NotFoundException(`Reporte ${id} no encontrado`);
        }
        const votos = await this.contarVotos(id);
        return { ...data, votos };
    }
    async findMisReportes() {
        const id_usuario = TODO_USUARIO_HARDCODEADO;
        const { data, error } = await supabase_config_1.supabase
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
            throw new common_1.BadRequestException(`Error: ${error.message}`);
        }
        return data;
    }
    async votar(id_reporte, dto) {
        const id_usuario = TODO_USUARIO_HARDCODEADO;
        const { data: votoExistente } = await supabase_config_1.supabase
            .from('votaciones')
            .select('id_votacion, id_tipo_voto')
            .eq('id_reporte', id_reporte)
            .eq('id_usuario', id_usuario)
            .single();
        if (votoExistente) {
            if (votoExistente.id_tipo_voto === dto.id_tipo_voto) {
                await supabase_config_1.supabase
                    .from('votaciones')
                    .delete()
                    .eq('id_votacion', votoExistente.id_votacion);
                return { mensaje: 'Voto eliminado' };
            }
            else {
                await supabase_config_1.supabase
                    .from('votaciones')
                    .update({ id_tipo_voto: dto.id_tipo_voto })
                    .eq('id_votacion', votoExistente.id_votacion);
                return { mensaje: 'Voto actualizado' };
            }
        }
        const { error } = await supabase_config_1.supabase.from('votaciones').insert({
            id_reporte,
            id_usuario,
            id_tipo_voto: dto.id_tipo_voto,
        });
        if (error) {
            throw new common_1.BadRequestException(`Error al votar: ${error.message}`);
        }
        return { mensaje: 'Voto registrado' };
    }
    async getComentarios(id_reporte) {
        const { data, error } = await supabase_config_1.supabase
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
            throw new common_1.BadRequestException(`Error al obtener comentarios: ${error.message}`);
        }
        return data;
    }
    async addComentario(id_reporte, dto) {
        const id_usuario = TODO_USUARIO_HARDCODEADO;
        await this.findOne(id_reporte);
        const { data, error } = await supabase_config_1.supabase
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
            throw new common_1.BadRequestException(`Error al agregar comentario: ${error.message}`);
        }
        return data;
    }
    async contarVotos(id_reporte) {
        const { data } = await supabase_config_1.supabase
            .from('votaciones')
            .select('id_tipo_voto')
            .eq('id_reporte', id_reporte);
        if (!data)
            return { activo: 0, inactivo: 0, total: 0 };
        const activo = data.filter((v) => v.id_tipo_voto === 1).length;
        const inactivo = data.filter((v) => v.id_tipo_voto === 2).length;
        return { activo, inactivo, total: activo + inactivo };
    }
    async getTiposBloqueo() {
        const { data, error } = await supabase_config_1.supabase
            .from('tipos_bloqueo')
            .select('id_tipo_bloqueo, nombre, descripcion, icono, color_hex, requiere_imagen')
            .order('id_tipo_bloqueo', { ascending: true });
        if (error) {
            throw new common_1.BadRequestException(`Error al obtener tipos de bloqueo: ${error.message}`);
        }
        return data;
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)()
], ReportsService);
//# sourceMappingURL=reports.service.js.map