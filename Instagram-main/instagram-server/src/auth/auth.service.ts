import { Body, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { RegisterService } from './register/register.service';
import { RegisterDto } from './register/dto/register.dto';
import { LoginDto } from './logIn/dto/login.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { pick } from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenDto } from 'src/token/dto/generateToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private registerService: RegisterService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}
  async register(@Body() registerDto: RegisterDto) {
    return this.registerService.registerUser(registerDto);
  }

  async validateUser(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: [{ email: loginDto.email }, { username: loginDto.email }]
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const checkPassword = await bcrypt.compare(loginDto.password, user.password);
    if (!checkPassword) throw new UnauthorizedException('Invalid credentials');
    return pick(user, ['user_id', 'username', 'email', 'avatar']);
  }

  async validateToken(token: string) {
    try {
      const user: GenerateTokenDto = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
