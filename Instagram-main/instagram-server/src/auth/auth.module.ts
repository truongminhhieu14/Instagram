import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterService } from './register/register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { TokenService } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User]), PassportModule],
  providers: [AuthService, RegisterService, LocalStrategy, TokenService, JwtService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
