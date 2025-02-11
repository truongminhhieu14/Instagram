import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventsService } from './events.service';
import { sendMessageDto } from './dto/sendMessage.dto';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { WsAuthGuard } from 'src/guard/ws-auth.guard';
import { SocketMiddleWare } from 'src/middleware/ws.middleware';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
@UseGuards(WsAuthGuard)
export class EventsGateway {
  constructor(private eventsService: EventsService) {}
  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    client.use(SocketMiddleWare() as any);
    console.log('Socket initialized');
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  async handleConnection(socket: Socket) {
    return await this.eventsService.getUser(socket);
  }

  async createMessage(content: string, sender_id: string, receiver_id: string) {
    return await this.eventsService.createMessage(content, sender_id, receiver_id);
  }

  @SubscribeMessage('send_message')
  async listenForMessages(@MessageBody() data: string, @ConnectedSocket() socket: Socket) {
    const user = await this.handleConnection(socket);
    this.server.sockets.emit('receive_message', { data, user });
  }

  @SubscribeMessage('disconnection')
  async disconnection() {}

  @SubscribeMessage('connection')
  async connection(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    const user_id = client['user'].user_id;
    client.join(user_id); //user join their own room
    this.server.to(user_id).emit('userJoin', `connection from ${user_id}`);
  }

  @SubscribeMessage('private_message')
  async privateMessage(@MessageBody() data: sendMessageDto, @ConnectedSocket() client: Socket) {
    if (data.sender_id !== client['user'].user_id)
      throw new UnauthorizedException('You are not authorized to send message');

    const message = await this.createMessage(data.content, data.sender_id, data.receiver_id);

    this.server
      .to(data.sender_id)
      .to(data.receiver_id)
      .emit(`private_message`, {
        message: 'Sent message succesfully',
        content: message.content,
        sentAt: message.created_at
      });
  }
}
