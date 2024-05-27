import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/middleware/auth/public';

@Public()
@Controller('google')
export class GoogleController {
  @Get('')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Guard redirects
  }

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect() {
    return 'Đăng nhập thành công';
  }
}
