"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGuard = void 0;
const common_1 = require("@nestjs/common");
const supabase_config_1 = require("../../config/supabase.config");
let JwtGuard = class JwtGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader)
            throw new common_1.UnauthorizedException('Token requerido');
        const token = authHeader.split(' ')[1];
        const { data, error } = await supabase_config_1.supabase.auth.getUser(token);
        if (error || !data.user)
            throw new common_1.UnauthorizedException('Token inválido o expirado');
        const { data: usuarioDb } = await supabase_config_1.supabase
            .from('usuarios')
            .select('id_usuario')
            .eq('auth_id', data.user.id)
            .single();
        if (!usuarioDb)
            throw new common_1.UnauthorizedException('Usuario no registrado en el sistema');
        request.user = {
            ...data.user,
            id_usuario: usuarioDb.id_usuario,
        };
        return true;
    }
};
exports.JwtGuard = JwtGuard;
exports.JwtGuard = JwtGuard = __decorate([
    (0, common_1.Injectable)()
], JwtGuard);
//# sourceMappingURL=jtw.guard.js.map