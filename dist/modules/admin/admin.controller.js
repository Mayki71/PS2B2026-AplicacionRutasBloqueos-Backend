"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const common_2 = require("@nestjs/common");
const jtw_guard_1 = require("../../common/guards/jtw.guard");
const admin_guard_1 = require("../../common/guards/admin.guard");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    getUsuarios() {
        return this.adminService.getUsuarios();
    }
    getReportes() {
        return this.adminService.getReportes();
    }
    cambiarEstado(body) {
        return this.adminService.cambiarEstado(body.id, body.estado);
    }
    desactivar(body) {
        return this.adminService.desactivarUsuario(body.id);
    }
    activar(body) {
        return this.adminService.activarUsuario(body.id);
    }
    promover(body) {
        return this.adminService.promoverAdmin(body.id);
    }
    quitarAdmin(body) {
        return this.adminService.quitarAdmin(body.id);
    }
    eliminarReporte(body) {
        return this.adminService.eliminarReporte(body.id);
    }
    eliminarComentario(body) {
        return this.adminService.eliminarComentario(body.id);
    }
    resolverReporte(body) {
        return this.adminService.resolverReporte(body.id);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('usuarios'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getUsuarios", null);
__decorate([
    (0, common_1.Get)('reportes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getReportes", null);
__decorate([
    (0, common_2.Post)('estado'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "cambiarEstado", null);
__decorate([
    (0, common_2.Post)('desactivar'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "desactivar", null);
__decorate([
    (0, common_2.Post)('activar'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "activar", null);
__decorate([
    (0, common_2.Post)('promover'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "promover", null);
__decorate([
    (0, common_2.Post)('quitar-admin'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "quitarAdmin", null);
__decorate([
    (0, common_2.Post)('eliminar-reporte'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "eliminarReporte", null);
__decorate([
    (0, common_2.Post)('eliminar-comentario'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "eliminarComentario", null);
__decorate([
    (0, common_2.Post)('resolver'),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "resolverReporte", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jtw_guard_1.JwtGuard, admin_guard_1.AdminGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map