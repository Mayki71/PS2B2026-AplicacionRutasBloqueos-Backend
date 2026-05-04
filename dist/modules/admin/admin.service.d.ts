export declare class AdminService {
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
    cambiarEstado(id: number, estado: number): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    desactivarUsuario(id: number): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    activarUsuario(id: number): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    promoverAdmin(id: number): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    quitarAdmin(id: number): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    eliminarReporte(id: number): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    eliminarComentario(id: number): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
    resolverReporte(id: number): Promise<{
        error: import("@supabase/postgrest-js").PostgrestError;
    } | null>;
}
