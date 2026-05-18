import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  email: string;

  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos',
    },
  )
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
    message: 'El nombre no puede contener números',
  })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido paterno es obligatorio' })
  @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
    message: 'El apellido paterno no puede contener números',
  })
  apellido_paterno: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido materno es obligatorio' })
  @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, {
    message: 'El apellido materno no puede contener números',
  })
  apellido_materno: string;
}
