import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: [{ email: loginDto.email }, { username: loginDto.email }]
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const checkPassword = await bcrypt.compare(loginDto.password, user.password);
    if (!checkPassword) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
