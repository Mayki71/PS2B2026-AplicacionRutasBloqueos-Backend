import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { CreateVoteDto } from './dto/create-vote.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

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

  // GET /reports/mis-reportes  ← debe ir ANTES de /:id para no colisionar
  @Get('mis-reportes')
  findMisReportes() {
    return this.reportsService.findMisReportes();
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
}