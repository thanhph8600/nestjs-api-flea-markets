import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Model } from 'mongoose';
import { Customer } from './interface/customer.interface';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private readonly customerModel: Model<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const user = await this.customerModel.findOne({
        phone: createCustomerDto.phone,
      });
      if (user) {
        return new HttpException(
          'Số điện thoại đã được dùng!',
          HttpStatus.CONFLICT,
        );
      }

      if (createCustomerDto.password.length < 6) {
        return new HttpException(
          'Mật khẩu phải có ít nhất 6 ký tự!',
          HttpStatus.BAD_REQUEST,
        );
      }

      createCustomerDto.password = await this.hasdPass(
        createCustomerDto.password,
      );
      const newUser = await this.customerModel.create(createCustomerDto);
      return newUser;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);
    customer.avata = `${process.env.URL_API}uploads/${customer.avata}`;
    return customer;
  }

  findOneWithPhone(phone: string) {
    return this.customerModel.findOne({ phone: phone });
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate({ _id: id }, updateCustomerDto);
  }

  updateRefreshToken(id: string, refreshToken: string) {
    return this.customerModel.findByIdAndUpdate(
      { _id: id },
      { refresh_token: refreshToken },
    );
  }

  async updatePassword(id: string, password: string, newPassword: string) {
    try {
      const user = await this.customerModel.findById({ _id: id });
      if (!user) {
        return new HttpException('User not found!', 404);
      }
      if (!(await this.comparePass(password, user.password))) {
        return new HttpException('Mật cũ khẩu không đúng!', 401);
      }
      if (newPassword.length < 6) {
        return new HttpException(
          'Mật khẩu mới phải có ít nhất 6 ký tự!',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (password === newPassword) {
        return new HttpException(
          'Mật khẩu mới không được trùng với mật khẩu cũ!',
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.customerModel.findByIdAndUpdate(
        { _id: id },
        { password: await this.hasdPass(newPassword) },
      );
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  async hasdPass(pass: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(pass, saltOrRounds);
  }
  async comparePass(pass: string, hash: string) {
    return await bcrypt.compare(pass, hash);
  }
}
