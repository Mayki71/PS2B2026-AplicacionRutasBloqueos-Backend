import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVoteDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'El tipo de voto es requerido' })
  id_tipo_voto: number;
  // id_usuario lo tomamos del JWT en el controller, no del body
}