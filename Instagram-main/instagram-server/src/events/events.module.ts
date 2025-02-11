import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { EventsService } from './events.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { RegisterService } from 'src/auth/register/register.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Message } from './message/message.entity';
import Room from './room/room.entity';
import { EventsController } from './events.controller';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Message, Room])],
  providers: [EventsGateway, EventsService, AuthService, RegisterService, JwtService],
  controllers: [EventsController]
})
export class EventsModule {}
