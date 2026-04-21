import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Body, Post } from '@nestjs/common';

@Controller('admin')
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

}