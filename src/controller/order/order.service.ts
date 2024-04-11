import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly productService: ProductService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    try {
      const product = await this.productService.findOne(
        createOrderDto.id_product,
      );
      console.log(product);
      if (product.isHidden == true) {
        return new HttpException('Sản phẩm đã được bán', HttpStatus.CONFLICT);
      }
      await this.productService.update(createOrderDto.id_product, {
        isHidden: true,
      });
      return this.orderModel.create(createOrderDto);
    } catch (error) {
      console.log('error create Order', error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    try {
      return this.orderModel
        .findById({ _id: id })
        .populate('id_seller')
        .populate('id_product')
        .populate('id_buyer');
    } catch (error) {
      console.log('error find by id  Order', error);
      throw new InternalServerErrorException();
    }
  }

  findByIdSeller(id_seller: string) {
    try {
      return this.orderModel
        .find({ id_seller })
        .populate('id_seller')
        .populate('id_product')
        .populate('id_buyer');
    } catch (error) {
      console.log('error find by id_seller', error);
      throw new InternalServerErrorException();
    }
  }

  findByIdBuyer(id_buyer: string) {
    try {
      return this.orderModel
        .find({ id_buyer })
        .populate('id_seller')
        .populate('id_product')
        .populate('id_buyer');
    } catch (error) {
      console.log('error find by id_buyer', error);
      throw new InternalServerErrorException();
    }
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      return this.orderModel.findByIdAndUpdate({ _id: id }, updateOrderDto);
    } catch (error) {
      console.log('error update order', error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
