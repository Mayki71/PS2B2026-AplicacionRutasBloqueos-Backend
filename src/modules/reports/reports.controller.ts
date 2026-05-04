import {
  Controller, Get, Post, Delete,
  Body, Param, Query, Req,
  ParseIntPipe, ValidationPipe, UseGuards,
} from '@nestjs/common';
//import { Request } from 'express';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateVoteDto } from './dto/create-vote.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtGuard } from '../../common/guards/jtw.guard';

@Controller('reports')
@UseGuards(JwtGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('tipos-bloqueo')
  getTiposBloqueo() {
    return this.reportsService.getTiposBloqueo();
  }

  @Post()
  create(@Req() req: any, @Body(ValidationPipe) dto: CreateReportDto) {
    const id_usuario = (req.user as any).id_usuario;
    return this.reportsService.create({ ...dto, id_usuario });
  }

  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  @Get('mis-reportes')
  findMisReportes(@Req() req: any) {
    const id_usuario = (req.user as any).id_usuario;
    return this.reportsService.findMisReportes(id_usuario);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.findOne(id);
  }

  @Post(':id/votar')
  votar(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: CreateVoteDto,
  ) {
    const id_usuario = (req.user as any).id_usuario;
    return this.reportsService.votar(id, dto, id_usuario);
  }

  @Get(':id/comentarios')
  getComentarios(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.getComentarios(id);
  }

  @Post(':id/comentarios')
  addComentario(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: CreateCommentDto,
  ) {
    const id_usuario = (req.user as any).id_usuario;
    return this.reportsService.addComentario(id, dto, id_usuario);
  }

  @Delete(':id')
  deleteReporte(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    const id_usuario = (req.user as any).id_usuario;
    return this.reportsService.deleteReporte(id, id_usuario);
  }
}