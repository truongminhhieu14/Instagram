import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { Message } from './message/message.entity';
import { Repository } from 'typeorm';
import Room from './room/room.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class EventsService {
  constructor(
    private authService: AuthService,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async getUser(socket: Socket) {
    try {
      const token = socket.handshake.headers.authorization.split(' ')[1];
      const user = await this.authService.validateToken(token);
      socket.request['user'] = user;
      return user;
    } catch (error) {
      if (error.message === 'jwt expired') throw new UnauthorizedException('Token expired');
      throw new UnauthorizedException('Unauthorized');
    }
  }

  async createMessage(content: string, sender_id: string, receiver_id: string) {
    if (!content || !sender_id || !receiver_id) throw new BadRequestException('Invalid parameters');
    console.log(content, sender_id, receiver_id);
    const user_1 = await this.userRepository //find user_1
      .createQueryBuilder('user')
      .where('user_id = :id', { id: sender_id })
      .getOne();
    const user_2 = await this.userRepository //find user_2
      .createQueryBuilder('user')
      .where('user_id = :id', { id: receiver_id })
      .getOne();
    const room = await this.roomRepository //check room exists
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.user_1', 'user_1')
      .leftJoinAndSelect('room.user_2', 'user_2')
      .where('user_1.user_id = :user_1 AND user_2.user_id = :user_2')
      .orWhere('user_1.user_id = :user_2 AND user_2.user_id = :user_1')
      .setParameters({ user_1: user_1.user_id, user_2: user_2.user_id })
      .getOne();
    if (!room) {
      // if room does not exist, create room
      const room = new Room();
      room.user_1 = user_1;
      room.user_2 = user_2;
      console.log('no room');

      await this.roomRepository.save(room); //same at below
      const message = new Message();
      message.content = content;
      message.sender_id = user_1;
      message.room = room;
      const messageSent = await this.messageRepository.save(message);
      await this.roomRepository
        .createQueryBuilder()
        .update(Room)
        .set({ updated_at: messageSent.created_at })
        .where('room_id = :id', { id: room.room_id })
        .execute();
      return messageSent;
    }

    const message = new Message();
    message.content = content;
    message.sender_id = user_1;
    message.room = room;
    const messageSent = await this.messageRepository.save(message);
    await this.roomRepository //change the time of room to the time of last message
      .createQueryBuilder()
      .update(Room)
      .set({ updated_at: messageSent.created_at })
      .where('room_id = :id', { id: room.room_id })
      .execute();
    return messageSent;
  }

  async getRoomOfUserByUserId(user_id: string, page: string) {
    const room = await this.roomRepository //check room exists
      .createQueryBuilder('room')
      .leftJoinAndSelect('room.user_1', 'user_1')
      .leftJoinAndSelect('room.user_2', 'user_2')
      .where('user_1.user_id = :id ')
      .orWhere('user_2.user_id = :id')
      .setParameter('id', user_id)
      .orderBy('room.updated_at', 'DESC')
      .take(4)
      .skip(Number(page) * 4)
      .getMany();
    if (!room) throw new BadRequestException('Room not found');
    const response = await Promise.all(
      room.map(async (room) => {
        const user = room.user_1.user_id === user_id ? room.user_2 : room.user_1; //check which user is the other user
        return { room_id: room.room_id, user, time_chat: room.updated_at };
      })
    );
    return response;
  }

  async getLastestMessageByRoomId(room_id: string, page: string) {
    const message = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.sender_id', 'user')
      .addSelect(['user.user_id', 'user.username', 'user.avatar'])
      .leftJoinAndSelect('message.room', 'room')
      .where('room.room_id = :id', { id: room_id })
      .orderBy('message.created_at', 'DESC')
      .take(10)
      .getMany();
    if (!message) throw new BadRequestException('Message not found');
    return message;
  }
}
