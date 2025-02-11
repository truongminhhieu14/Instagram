import { Body, Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('message')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getRoomOfUser(@Request() req, @Body() body: { page: string }) {
    return await this.eventsService.getRoomOfUserByUserId(req.user.user_id, body.page);
  }

  @Get(':room_id')
  @UseGuards(JwtAuthGuard)
  async getMessageByRoomId(@Param('room_id') room_id: string, @Body() body: { page: string }) {
    return await this.eventsService.getLastestMessageByRoomId(room_id, body.page);
  }
}
