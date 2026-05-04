import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateVoteDto } from './dto/create-vote.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getTiposBloqueo(): Promise<{
        id_tipo_bloqueo: any;
        nombre: any;
        descripcion: any;
        icono: any;
        color_hex: any;
        requiere_imagen: any;
    }[]>;
    create(req: any, dto: CreateReportDto): Promise<any>;
    findAll(): Promise<{
        votos: {
            activo: number;
            inactivo: number;
            total: number;
        };
        id_reporte: any;
        id_usuario: any;
        descripcion: any;
        hora_inicio: any;
        fecha_creacion: any;
        tiene_imagenes: any;
        imagen_principal_url: any;
        ubicaciones: {
            id_ubicacion: any;
            latitud: any;
            longitud: any;
            latitud_fin: any;
            longitud_fin: any;
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
    findMisReportes(req: any): Promise<{
        id_reporte: any;
        id_usuario: any;
        descripcion: any;
        hora_inicio: any;
        fecha_creacion: any;
        ubicaciones: {
            latitud: any;
            longitud: any;
            latitud_fin: any;
            longitud_fin: any;
            direccion: any;
            referencia: any;
        }[];
        tipos_bloqueo: {
            nombre: any;
        }[];
    }[]>;
    findOne(id: number): Promise<{
        votos: {
            activo: number;
            inactivo: number;
            total: number;
        };
        id_reporte: any;
        id_usuario: any;
        descripcion: any;
        hora_inicio: any;
        fecha_creacion: any;
        tiene_imagenes: any;
        imagen_principal_url: any;
        ubicaciones: {
            id_ubicacion: any;
            latitud: any;
            longitud: any;
            latitud_fin: any;
            longitud_fin: any;
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
    votar(req: any, id: number, dto: CreateVoteDto): Promise<{
        mensaje: string;
    }>;
    getComentarios(id: number): Promise<{
        id_comentario: any;
        comentario: any;
        fecha_comentario: any;
        es_editado: any;
        usuarios: {
            nombre: any;
            apellido_paterno: any;
        }[];
    }[]>;
    addComentario(req: any, id: number, dto: CreateCommentDto): Promise<{
        id_comentario: any;
        comentario: any;
        fecha_comentario: any;
        usuarios: {
            nombre: any;
            apellido_paterno: any;
        }[];
    }>;
    deleteReporte(req: any, id: number): Promise<{
        mensaje: string;
    }>;
}
