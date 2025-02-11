import { NextFunction } from 'express';
import { Socket } from 'socket.io';
import { WsAuthGuard } from 'src/guard/ws-auth.guard';

export const SocketMiddleWare = () => {
  return (socket: Socket, next: NextFunction) => {
    try {
      WsAuthGuard.validateToken(socket)
      next()
    } catch (error) {
        console.log(error)
        next(error)
    }
  };
};
