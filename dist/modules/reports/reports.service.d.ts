import { CreateReportDto } from './dto/create-report.dto';
import { CreateVoteDto } from './dto/create-vote.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class ReportsService {
    create(dto: CreateReportDto): Promise<any>;
    findAll(): Promise<{
        votos: {
            activo: number;
            inactivo: number;
            total: number;
        };
        id_reporte: any;
        descripcion: any;
        hora_inicio: any;
        fecha_creacion: any;
        tiene_imagenes: any;
        imagen_principal_url: any;
        ubicaciones: {
            id_ubicacion: any;
            latitud: any;
            longitud: any;
            direccion: any;
            referencia: any;
        }[];
        tipos_bloqueo: {
            id_tipo_bloqueo: any;
            nombre: any;
            icono: any;
            color_hex: any;
        }[];
        estados_reporte: {
            id_estado: any;
            nombre_estado: any;
        }[];
    }[]>;
    findOne(id: number): Promise<{
        votos: {
            activo: number;
            inactivo: number;
            total: number;
        };
        id_reporte: any;
        descripcion: any;
        hora_inicio: any;
        fecha_creacion: any;
        tiene_imagenes: any;
        imagen_principal_url: any;
        ubicaciones: {
            id_ubicacion: any;
            latitud: any;
            longitud: any;
            direccion: any;
            referencia: any;
        }[];
        tipos_bloqueo: {
            id_tipo_bloqueo: any;
            nombre: any;
            icono: any;
            color_hex: any;
        }[];
        estados_reporte: {
            id_estado: any;
            nombre_estado: any;
        }[];
    }>;
    findMisReportes(): Promise<{
        id_reporte: any;
        descripcion: any;
        hora_inicio: any;
        fecha_creacion: any;
        ubicaciones: {
            direccion: any;
            referencia: any;
        }[];
        tipos_bloqueo: {
            nombre: any;
        }[];
    }[]>;
    votar(id_reporte: number, dto: CreateVoteDto): Promise<{
        mensaje: string;
    }>;
    getComentarios(id_reporte: number): Promise<{
        id_comentario: any;
        comentario: any;
        fecha_comentario: any;
        es_editado: any;
        usuarios: {
            nombre: any;
            apellido_paterno: any;
        }[];
    }[]>;
    addComentario(id_reporte: number, dto: CreateCommentDto): Promise<{
        id_comentario: any;
        comentario: any;
        fecha_comentario: any;
        usuarios: {
            nombre: any;
            apellido_paterno: any;
        }[];
    }>;
    private contarVotos;
    getTiposBloqueo(): Promise<{
        id_tipo_bloqueo: any;
        nombre: any;
        descripcion: any;
        icono: any;
        color_hex: any;
        requiere_imagen: any;
    }[]>;
}
