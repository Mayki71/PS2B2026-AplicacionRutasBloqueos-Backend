export declare class CreateReportDto {
    id_usuario?: number;
    id_tipo_bloqueo: number;
    descripcion: string;
    latitud: number;
    longitud: number;
    latitud_fin?: number;
    longitud_fin?: number;
    direccion?: string;
    referencia?: string;
    comentario_inicial?: string;
    imagen_url?: string;
}
