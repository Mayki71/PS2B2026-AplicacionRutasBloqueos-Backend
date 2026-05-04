import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getUsuarios(): Promise<any[] | {
        error: import("@supabase/postgrest-js").PostgrestError;
    }>;
    getReportes(): Promise<{
        id_reporte: any;
        id_usuario: any;
        descripcion: any;
        hora_inicio: any;
        fecha_creacion: any;
        id_estado: any;
        tiene_imagenes: any;
        imagen_principal_url: any;
        estados_reporte: {
            nombre_estado: any;
        }[];
        usuarios: {
            nombre: any;
            apellido_paterno: any;
        }[];
        ubicaciones: {
            latitud: any;
            longitud: any;
            latitud_fin: any;
            longitud_fin: any;
        }[];
        tipos_bloqueo: {
            nombre: any;
            color_hex: any;
            icono: any;
        }[];
        comentarios: {
            id_comentario: any;
            id_usuario: any;
            comentario: any;
            fecha_comentario: any;
            usuarios: {
                nombre: any;
                apellido_paterno: any;
            }[];
        }[];
    }[] | {
        error: import("@supabase/postgrest-js").PostgrestError;
    }>;
    cambiarEstado(body: any): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    desactivar(body: any): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    activar(body: any): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    promover(body: any): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    quitarAdmin(body: any): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    eliminarReporte(body: any): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    eliminarComentario(body: any): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    resolverReporte(body: any): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
}
