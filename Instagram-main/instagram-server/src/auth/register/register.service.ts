import { Body, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async registerUser(@Body() registerDto: RegisterDto) {
    const isEmailExist = await this.userRepository.findOne({ where: { email: registerDto.email } });
    if (isEmailExist) throw new ConflictException('Email already exists');
    const isUsernameExist = await this.userRepository.findOne({ where: { username: registerDto.username } });
    if (isUsernameExist) throw new ConflictException('Username already exists');
    try {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(registerDto.password, salt);
      const user = this.userRepository.create({ ...registerDto, password: passwordHash });
      await this.userRepository.save(user);
      return {user, message: 'User registered successfully'};
    } catch (error) {
      throw new Error(error);
    }
  }
}
