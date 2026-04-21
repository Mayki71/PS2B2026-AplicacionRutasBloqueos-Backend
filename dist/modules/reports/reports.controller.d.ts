import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateVoteDto } from './dto/create-vote.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    create(createReportDto: CreateReportDto): Promise<any>;
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
    votar(id: number, createVoteDto: CreateVoteDto): Promise<{
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
    addComentario(id: number, createCommentDto: CreateCommentDto): Promise<{
        id_comentario: any;
        comentario: any;
        fecha_comentario: any;
        usuarios: {
            nombre: any;
            apellido_paterno: any;
        }[];
    }>;
}
