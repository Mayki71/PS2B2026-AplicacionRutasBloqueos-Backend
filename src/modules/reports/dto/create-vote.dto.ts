import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVoteDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'El tipo de voto es requerido' })
  id_tipo_voto: number;
}