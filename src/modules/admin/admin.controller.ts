import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Body, Post } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jtw.guard';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('admin')
@UseGuards(JwtGuard, AdminGuard)
export class AdminController {

  constructor(private adminService: AdminService) {}

  @Get('usuarios')
  getUsuarios() {
    return this.adminService.getUsuarios();
  }

  @Get('reportes')
getReportes() {
  return this.adminService.getReportes();
}

@Post('estado')
cambiarEstado(@Body() body: any) {
  return this.adminService.cambiarEstado(body.id, body.estado);
}


@Post('desactivar')
desactivar(@Body() body: any) {
  return this.adminService.desactivarUsuario(body.id);
}

@Post('activar')
activar(@Body() body: any) {
  return this.adminService.activarUsuario(body.id);
}

@Post('promover')
promover(@Body() body: any) {
  return this.adminService.promoverAdmin(body.id);
}

@Post('quitar-admin')
quitarAdmin(@Body() body: any) {
  return this.adminService.quitarAdmin(body.id);
}

@Post('eliminar-reporte')
eliminarReporte(@Body() body: any) {
  return this.adminService.eliminarReporte(body.id);
}

@Post('eliminar-comentario')
eliminarComentario(@Body() body: any) {
  return this.adminService.eliminarComentario(body.id);
}

@Post('resolver')
resolverReporte(@Body() body: any) {
  return this.adminService.resolverReporte(body.id);
}

}