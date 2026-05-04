import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        token: string | undefined;
        usuario: {
            auth_id: string;
            email: string | undefined;
            nombre: string;
            apellido_paterno: string;
            apellido_materno: string;
            telefono: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        usuario: {
            id: any;
            auth_id: any;
            email: string | undefined;
            nombre: any;
            apellido_paterno: any;
            apellido_materno: any;
            telefono: any;
            es_activo: any;
            es_administrador: any;
        };
    }>;
}
