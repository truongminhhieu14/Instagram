import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async deleteUser(username: string, email: string): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .where('username = :username AND email = :email', { username, email })
      .execute();
  }

  async getProfile(id: string): Promise<User> {
    return await this.userRepository.createQueryBuilder('user').where('user.user_id = :id', { id }).getOne();
  }

  async updateBio(id: string, data: string) {
    await this.userRepository.createQueryBuilder().update(User).set({ bio: data }).where('id = :id', { id }).execute();
  }

  async updateUsername(id: string, username: string) {
    const checkExist = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
    if (checkExist) {
      throw new ConflictException('Username already exists');
    }
    return await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ username })
      .where('id = :id', { id })
      .execute();
  }

  async updateEmail(id: string, email: string) {
    const checkExist = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (checkExist) {
      throw new ConflictException('Email already exists');
    }
    return await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ email })
      .where('id = :id', { id })
      .execute();
  }

  async updateAvatar(id: string, avatar: string) {}
}
