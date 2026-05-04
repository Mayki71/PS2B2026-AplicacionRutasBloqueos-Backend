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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const reports_service_1 = require("./reports.service");
const create_report_dto_1 = require("./dto/create-report.dto");
const create_vote_dto_1 = require("./dto/create-vote.dto");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const jtw_guard_1 = require("../../common/guards/jtw.guard");
let ReportsController = class ReportsController {
    reportsService;
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    getTiposBloqueo() {
        return this.reportsService.getTiposBloqueo();
    }
    create(req, dto) {
        const id_usuario = req.user.id_usuario;
        return this.reportsService.create({ ...dto, id_usuario });
    }
    findAll() {
        return this.reportsService.findAll();
    }
    findMisReportes(req) {
        const id_usuario = req.user.id_usuario;
        return this.reportsService.findMisReportes(id_usuario);
    }
    findOne(id) {
        return this.reportsService.findOne(id);
    }
    votar(req, id, dto) {
        const id_usuario = req.user.id_usuario;
        return this.reportsService.votar(id, dto, id_usuario);
    }
    getComentarios(id) {
        return this.reportsService.getComentarios(id);
    }
    addComentario(req, id, dto) {
        const id_usuario = req.user.id_usuario;
        return this.reportsService.addComentario(id, dto, id_usuario);
    }
    deleteReporte(req, id) {
        const id_usuario = req.user.id_usuario;
        return this.reportsService.deleteReporte(id, id_usuario);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('tipos-bloqueo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getTiposBloqueo", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_report_dto_1.CreateReportDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('mis-reportes'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "findMisReportes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id/votar'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_vote_dto_1.CreateVoteDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "votar", null);
__decorate([
    (0, common_1.Get)(':id/comentarios'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getComentarios", null);
__decorate([
    (0, common_1.Post)(':id/comentarios'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "addComentario", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "deleteReporte", null);
exports.ReportsController = ReportsController = __decorate([
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jtw_guard_1.JwtGuard),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map