import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'El comentario no puede estar vacío' })
  comentario: string;

  @IsOptional()
  @IsInt()
  id_usuario?: number;
}