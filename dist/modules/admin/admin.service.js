"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const supabase_config_1 = require("../../config/supabase.config");
let AdminService = class AdminService {
    async getUsuarios() {
        const { data, error } = await supabase_config_1.supabase
            .from('usuarios')
            .select('*');
        if (error) {
            return { error };
        }
        return data;
    }
    async getReportes() {
        const { data, error } = await supabase_config_1.supabase
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
        if (error)
            return { error };
        return data;
    }
    async cambiarEstado(id, estado) {
        const { data, error } = await supabase_config_1.supabase
            .from('reportes')
            .update({ id_estado: estado })
            .eq('id_reporte', id);
        if (error)
            return { error };
        return data;
    }
    async desactivarUsuario(id) {
        const { data, error } = await supabase_config_1.supabase
            .from('usuarios')
            .update({ es_activo: false })
            .eq('id_usuario', id);
        if (error)
            return { error };
        return data;
    }
    async activarUsuario(id) {
        const { data, error } = await supabase_config_1.supabase
            .from('usuarios')
            .update({ es_activo: true })
            .eq('id_usuario', id);
        if (error)
            return { error };
        return data;
    }
    async promoverAdmin(id) {
        const { data, error } = await supabase_config_1.supabase
            .from('usuarios')
            .update({ es_administrador: true })
            .eq('id_usuario', id);
        if (error)
            return { error };
        return data;
    }
    async quitarAdmin(id) {
        const { data, error } = await supabase_config_1.supabase
            .from('usuarios')
            .update({ es_administrador: false })
            .eq('id_usuario', id);
        if (error)
            return { error };
        return data;
    }
    async eliminarReporte(id) {
        const { data, error } = await supabase_config_1.supabase
            .from('reportes')
            .delete()
            .eq('id_reporte', id);
        if (error)
            return { error };
        return data;
    }
    async eliminarComentario(id) {
        const { data, error } = await supabase_config_1.supabase
            .from('comentarios')
            .delete()
            .eq('id_comentario', id);
        if (error)
            return { error };
        return data;
    }
    async resolverReporte(id) {
        const { data, error } = await supabase_config_1.supabase
            .from('reportes')
            .update({ id_estado: 2 })
            .eq('id_reporte', id);
        if (error)
            return { error };
        return data;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
//# sourceMappingURL=admin.service.js.map