import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway as WebSocketGate,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Messenger } from 'src/controller/chat/messenger/interface/messenger.chat.interface';
import { ClientToServerEvents, ServerToClientEvents } from './chat.interface';

@WebSocketGate({
  cors: {
    origin: '*',
  },
})
export class WebSocketGateway {
  @WebSocketServer()
  server: Server = new Server<ServerToClientEvents, ClientToServerEvents>();

  private logger = new Logger('WebSocketGateway');

  @SubscribeMessage('messenger')
  async handleEvent(
    @MessageBody()
    payload: Messenger,
  ): Promise<Messenger> {
    console.log(payload);
    try {
      this.server.emit('messenger', payload); // broadcast messages
      return payload;
    } catch (error) {
      console.log('error emit mess');
      console.log(error);
    }
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
