import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { CustomerService } from 'src/controller/customer/customer.service';
import { CreateCustomerDto } from 'src/controller/customer/dto/create-customer.dto';
import { AuthService } from 'src/middleware/auth/auth.service';
import { WebSocketGateway } from 'src/web-socket/web-socket.gateway';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private websocketGateway: WebSocketGateway,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.URL_API + 'google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      const { name, emails, photos } = profile;
      let customer = await this.customerService.findOneWithEmail(
        emails[0].value,
      );
      if (!customer) {
        const data: CreateCustomerDto = {
          email: emails[0].value,
          name: name.familyName + ' ' + name.givenName,
          avata: photos[0].value,

          phone: '',
          password: profile.id + Math.floor(Math.random() * 99),
          role: 1,
          refresh_token: '',
          isBan: false,
        };
        customer = await this.customerService.addUser(data);
      }
      const payload = this.authService.payload(customer);
      console.log(payload);
      const token = await this.authService.generateToken(payload);
      await this.websocketGateway.login(token);
      done(null, token);
    } catch (err) {
      done(err, false);
    }
  }
}
