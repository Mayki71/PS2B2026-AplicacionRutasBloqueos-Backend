"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const supabase_config_1 = require("../../config/supabase.config");
let AdminGuard = class AdminGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user)
            return false;
        const { data: usuario, error } = await supabase_config_1.supabase
            .from('usuarios')
            .select('es_administrador, es_activo')
            .eq('auth_id', user.id)
            .single();
        if (error || !usuario) {
            throw new common_1.ForbiddenException('Usuario no encontrado en la base de datos');
        }
        if (!usuario.es_activo) {
            throw new common_1.ForbiddenException('Tu cuenta ha sido baneada o desactivada');
        }
        if (!usuario.es_administrador) {
            throw new common_1.ForbiddenException('No tienes permisos de administrador');
        }
        return true;
    }
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)()
], AdminGuard);
//# sourceMappingURL=admin.guard.js.map