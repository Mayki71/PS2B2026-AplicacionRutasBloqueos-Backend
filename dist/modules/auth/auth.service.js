"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const supabase_config_1 = require("../../config/supabase.config");
let AuthService = class AuthService {
    async register(dto) {
        const { data, error } = await supabase_config_1.supabase.auth.signUp({
            email: dto.email,
            password: dto.password,
        });
        if (error)
            throw new common_1.ConflictException(error.message);
        if (!data.user)
            throw new common_1.ConflictException('No se pudo crear el usuario');
        const { error: profileError } = await supabase_config_1.supabase.from('usuarios').insert({
            auth_id: data.user.id,
            nombre: dto.nombre,
            apellido_paterno: dto.apellido_paterno,
            apellido_materno: dto.apellido_materno,
            telefono: dto.telefono,
            es_activo: true,
            es_administrador: false,
            fecha_registro: new Date(),
        });
        if (profileError) {
            console.error('Error al insertar perfil:', profileError);
            throw new Error(profileError.message);
        }
        return {
            token: data.session?.access_token,
            usuario: {
                auth_id: data.user.id,
                email: data.user.email,
                nombre: dto.nombre,
                apellido_paterno: dto.apellido_paterno,
                apellido_materno: dto.apellido_materno,
                telefono: dto.telefono,
            },
        };
    }
    async login(dto) {
        const { data, error } = await supabase_config_1.supabase.auth.signInWithPassword({
            email: dto.email,
            password: dto.password,
        });
        if (error)
            throw new common_1.UnauthorizedException('Email o contraseña incorrectos');
        const { data: perfil } = await supabase_config_1.supabase
            .from('usuarios')
            .select('*')
            .eq('auth_id', data.user.id)
            .single();
        if (!perfil) {
            throw new common_1.UnauthorizedException('Perfil no encontrado');
        }
        if (!perfil.es_activo) {
            throw new common_1.UnauthorizedException('su perfil o su cuenta sido baneado por incumplir a las normas de la pagina web');
        }
        return {
            token: data.session.access_token,
            usuario: {
                id: perfil.id_usuario,
                auth_id: perfil.auth_id,
                email: data.user.email,
                nombre: perfil.nombre,
                apellido_paterno: perfil.apellido_paterno,
                apellido_materno: perfil.apellido_materno,
                telefono: perfil.telefono,
                es_activo: perfil.es_activo,
                es_administrador: perfil.es_administrador,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map