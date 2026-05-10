import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from 'src/common/guards/jtw.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('resend-verification')
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getMe(@Request() req) {
    return this.authService.getMe(req.user.id);
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  updateMe(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.authService.updateMe(req.user.id, dto);
  }
}
