import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/controller/customer/customer.service';
import * as bcrypt from 'bcrypt';
import { CreateCustomerDto } from 'src/controller/customer/dto/create-customer.dto';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  async signIn(phone: string, pass: string) {
    try {
      const user = await this.customerService.findOneWithPhone(phone);
      if (!user) {
        return new HttpException('Số điện thoại không tồn tại!', 404);
      }
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        return new HttpException('Mật khẩu không đúng!', 401);
      }

      const payload = this.payload(user);

      return this.generateToken(payload);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  async refreshToken(refresh_token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.customerService.findOneWithPhone(payload.phone);
      if (!user) {
        return new HttpException('User not found!', 404);
      }
      if (user.refresh_token !== refresh_token) {
        return new HttpException('Invalid refresh token!', 401);
      }
      const newPayload = this.payload(user);
      return this.generateToken(newPayload);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  private async generateToken(payload) {
    try {
      const access_token = await this.jwtService.signAsync(payload);
      const refresh_token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME,
      });
      await this.customerService.updateRefreshToken(payload.sub, refresh_token);
      return { access_token, refresh_token };
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  payload(user: any) {
    return {
      username: user.name,
      phone: user.phone,
      sub: user._id,
      role: 'customer',
    };
  }

  async register(signUpDto: CreateCustomerDto) {
    try {
      const user = await this.customerService.create(signUpDto);
      return user;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }
}
