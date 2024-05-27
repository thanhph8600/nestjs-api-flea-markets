import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleController } from './google.controller';
import { GoogleStrategy } from './google.strategy';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from 'src/controller/customer/customer.module';
import { AuthModule } from 'src/middleware/auth/auth.module';
import { WebSocketModule } from 'src/web-socket/web-socket.module';

@Module({
  imports: [PassportModule, CustomerModule, AuthModule, WebSocketModule],
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy],
})
export class GoogleModule {}
