import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() !== 'ws') return true;

    const client: Socket = context.switchToWs().getClient();
    WsAuthGuard.validateToken(client);
    return true;
  }

  static validateToken(client: Socket) {
    const authorization = client.handshake.headers.authorization;
    try {
      const token = authorization.split(' ')[1];
      const payload = verify(token, process.env.JWT_SECRET);
      client['user'] = payload;
      return payload;
    } catch (error) {
      if (error.message === 'jwt expired') {
        throw new UnauthorizedException('Token expired');
      }
      throw new BadRequestException(error);
    }
  }
}
