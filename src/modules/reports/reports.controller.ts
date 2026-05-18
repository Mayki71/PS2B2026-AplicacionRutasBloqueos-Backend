import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
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

  // POST /reports
  @Post()
  create(@Body(ValidationPipe) createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  // GET /reports
  @Get()
  findAll() {
    return this.reportsService.findAll();
  }

  // GET /reports/mis-reportes?id_usuario=X  ← antes de /:id para no colisionar
  @Get('mis-reportes')
  findMisReportes(@Query('id_usuario') id_usuario?: string) {
    const uid = id_usuario ? parseInt(id_usuario, 10) : undefined;
    return this.reportsService.findMisReportes(uid);
  }

  // GET /reports/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.findOne(id);
  }

  // POST /reports/:id/votar
  @Post(':id/votar')
  votar(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createVoteDto: CreateVoteDto,
  ) {
    return this.reportsService.votar(id, createVoteDto);
  }

  // GET /reports/:id/comentarios
  @Get(':id/comentarios')
  getComentarios(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.getComentarios(id);
  }

  // POST /reports/:id/comentarios
  @Post(':id/comentarios')
  addComentario(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
  ) {
    return this.reportsService.addComentario(id, createCommentDto);
  }

  // DELETE /reports/:id?id_usuario=X  ← solo el dueño puede eliminar
  @Delete(':id')
  deleteReporte(
    @Param('id', ParseIntPipe) id: number,
    @Query('id_usuario') id_usuario: string,
  ) {
    return this.reportsService.deleteReporte(id, parseInt(id_usuario, 10));
  }
}