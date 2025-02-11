import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  Request,
  Res,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { RegisterDto } from './register/dto/register.dto';
import { AuthService } from './auth.service';
import { TokenService } from 'src/token/token.service';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const user = req.user;
    const accessToken = await this.tokenService.generateAccessToken(req.user);
    const refreshToken = await this.tokenService.generateRefreshToken(req.user);
    return { user, accessToken, refreshToken, message: 'Login Succusfully' };
  }


}
