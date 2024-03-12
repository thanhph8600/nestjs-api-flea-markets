import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './public';
import { CreateCustomerDto } from 'src/controller/customer/dto/create-customer.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.phone, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() signUpDto: CreateCustomerDto) {
    return this.authService.register(signUpDto);
  }

  @Post('refresh-token')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.body.refresh_token);
  }
}
