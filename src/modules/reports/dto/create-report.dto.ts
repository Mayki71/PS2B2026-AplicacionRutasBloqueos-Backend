import { IsString, IsNumber, IsOptional, IsNotEmpty, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'El tipo de bloqueo es requerido' })
  id_tipo_bloqueo: number;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  descripcion: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'La latitud debe ser un número' })
  @Min(-90) @Max(90)
  latitud: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'La longitud debe ser un número' })
  @Min(-180) @Max(180)
  longitud: number;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  referencia?: string;

  @IsString()
  @IsOptional()
  comentario_inicial?: string;

  @IsString()
  @IsOptional()
  imagen_url?: string;
}