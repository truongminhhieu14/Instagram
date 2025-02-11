import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenDto } from './dto/generateToken.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async generateAccessToken(generateTokenDto: GenerateTokenDto) {
    try {
      return this.jwtService.signAsync(generateTokenDto, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1d'
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async generateRefreshToken(generateTokenDto: GenerateTokenDto) {
    try {
      return this.jwtService.signAsync(generateTokenDto, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '7d'
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async verifyToken(token: string) {
    try {
      const checkAuth = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET')
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired. Please login again');
      }
      throw new Error(error);
    }
  }
}
