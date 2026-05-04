import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'El comentario no puede estar vacío' })
  comentario: string;
  // id_usuario lo tomamos del JWT en el controller, no del body
}