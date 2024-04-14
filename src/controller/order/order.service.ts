import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model, ObjectId } from 'mongoose';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ProductService } from '../product/product.service';
import { WalletService } from '../wallet/wallet/wallet.service';
import { UpdateWalletDto } from '../wallet/wallet/dto/update-wallet.dto';
import { NotificationService } from '../notification/notification.service';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly productService: ProductService,
    private readonly walletService: WalletService,
    private readonly notificationService: NotificationService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    try {
      if (createOrderDto.id_buyer == createOrderDto.id_seller) {
        return new HttpException(
          'Không thể bán cho chính mình',
          HttpStatus.BAD_REQUEST,
        );
      }
      const product = await this.productService.findOne(
        createOrderDto.id_product,
      );
      if (product.isHidden == true) {
        return new HttpException(
          'Sản phẩm đã được bán',
          HttpStatus.BAD_REQUEST,
        );
      }

      //Check and update walet buyer
      const walletBuyer = await this.walletService.findOneByIdCustomer(
        createOrderDto.id_buyer,
      );
      const dataUpdateWalletBuyer: UpdateWalletDto = {
        method: 'minus',
        amount: product.price,
        content: `Thanh toán sản phẩm ${product.title}(${product._id})`,
      };
      await this.walletService.update(walletBuyer._id, dataUpdateWalletBuyer);

      //create Order
      const order = await this.orderModel.create(createOrderDto);

      // update isHidden product
      await this.productService.update(createOrderDto.id_product, {
        isHidden: true,
      });

      // create notification buyer
      await this.notificationService.create(
        this.formCreateNotificationByBuyer(order),
      );

      // create notification buyer
      await this.notificationService.create(
        this.formCreateNotificationBySeller(order),
      );

      return order;
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

  async findByIdSeller(id_seller: string) {
    try {
      const listOrder = await this.orderModel
        .find({ id_seller })
        .populate('id_seller')
        .populate('id_product')
        .populate('id_buyer');
      listOrder.forEach((order) => {
        const thumbnail = order.id_product[0].thumbnail[0];
        if (
          !thumbnail.startsWith('http://') &&
          !thumbnail.startsWith('https://')
        )
          order.id_product[0].thumbnail[0] = `${process.env.URL_APi}uploads/${thumbnail}`;
      });
      return listOrder;
    } catch (error) {
      console.log('error find by id_seller', error);
      throw new InternalServerErrorException();
    }
  }

  async findByIdBuyer(id_buyer: ObjectId) {
    try {
      const listOrder = await this.orderModel
        .find({ id_buyer })
        .populate('id_seller')
        .populate('id_product')
        .populate('id_buyer');
      listOrder.forEach((order) => {
        const thumbnail = order.id_product[0].thumbnail[0];
        if (
          !thumbnail.startsWith('http://') &&
          !thumbnail.startsWith('https://')
        )
          order.id_product[0].thumbnail[0] = `${process.env.URL_APi}uploads/${thumbnail}`;
      });
      return listOrder;
    } catch (error) {
      console.log('error find by id_buyer', error);
      throw new InternalServerErrorException();
    }
  }

  async update(
    id: ObjectId,
    updateOrderDto: UpdateOrderDto,
    idCustomer: ObjectId,
  ) {
    try {
      const order = await this.orderModel.findById({ _id: id });
      if (order.status == 'cancel_exp')
        return new HttpException('Đơn hàng đã bị hủy!', HttpStatus.BAD_REQUEST);
      if (order.status == 'successful_delivery')
        return new HttpException(
          'Đơn hàng đã hoàn thành!',
          HttpStatus.BAD_REQUEST,
        );
      if (updateOrderDto.status == 'cancel_exp') {
        if (
          (order.id_buyer != idCustomer || order.id_seller != idCustomer) &&
          (order.status == 'delivered' || order.status == 'delivering')
        ) {
          return new HttpException(
            'Không thể hủy đơn hàng!',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else if (updateOrderDto.status == 'successful_delivery') {
        if (order.status != 'delivered' || order.id_buyer != idCustomer) {
          return new HttpException(
            'Bạn không đủ thẩm quyền!',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        if (order.status == 'waiting_confirm')
          updateOrderDto.status = 'processing';
        if (order.status == 'processing') updateOrderDto.status = 'delivering';
        if (order.status == 'delivering') updateOrderDto.status = 'delivered';
        if (
          (updateOrderDto.status == 'processing' &&
            order.id_seller != idCustomer) ||
          (updateOrderDto.status == 'delivering' &&
            order.id_seller != idCustomer) ||
          (updateOrderDto.status == 'delivered' &&
            order.id_seller != idCustomer)
        ) {
          return new HttpException(
            'Bạn không đủ thẩm quyền!',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const updateOrder = await this.orderModel.findByIdAndUpdate(
        { _id: id },
        updateOrderDto,
      );

      if (updateOrderDto.status == 'cancel_exp') {
        const wallet = await this.walletService.findOneByIdCustomer(
          order.id_buyer[0],
        );
        const data: UpdateWalletDto = {
          method: 'plus',
          amount: order.price,
          content: 'Hoàn trả tiền đặt hàng',
        };
        await this.walletService.update(wallet._id, data);

        await this.productService.update(order.id_product[0], {
          isHidden: false,
        });
      }

      if (updateOrderDto.status == 'successful_delivery') {
        const wallet = await this.walletService.findOneByIdCustomer(
          order.id_seller[0],
        );
        const data: UpdateWalletDto = {
          method: 'plus',
          amount: order.price,
          content: 'Tiền thanh toán sản phẩm',
        };
        await this.walletService.update(wallet._id, data);
      }

      updateOrder.status = updateOrderDto.status;
      // create notification buyer
      await this.notificationService.create(
        this.formCreateNotificationByBuyer(updateOrder),
      );

      // create notification buyer
      await this.notificationService.create(
        this.formCreateNotificationBySeller(updateOrder),
      );

      return updateOrder;
    } catch (error) {
      console.log('error update order', error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }

  formCreateNotificationByBuyer(order: Order) {
    const data: CreateNotificationDto = {
      id_customer: order.id_buyer,
      id_product: order.id_product,
      content: 'Đặt hàng thành công',
      description: 'Chờ người bán xác nhận đơn hàng cho bạn',
      created_at: new Date(),
      isWatched: false,
      link: 'my-orders/buyer',
      isNew: true,
    };
    if (order.status == 'processing') {
      data.content = 'Đơn hàng đã được xác nhận';
      data.description = 'Người bán đã xác nhận đơn hàng cho bạn';
    }
    if (order.status == 'delivering') {
      data.content = 'Đơn hàng đang giao đến bạn';
      data.description = 'Người bán đang giao đơn hàng cho bạn';
    }
    if (order.status == 'delivered') {
      data.content = 'Đơn hàng đã được giao thành công';
      data.description = 'Người bán đã giao đơn hàng cho bạn';
    }
    if (order.status == 'cancel_exp') {
      data.content = 'Đơn hàng đã bị hủy';
      data.description = 'Đơn hàng của bạn đã bị hủy';
    }
    if (order.status == 'successful_delivery') {
      data.content = 'Đơn hàng đã hoan thanh';
      data.description = 'Đơn hàng của bạn đã hoan thanh';
    }
    return data;
  }

  formCreateNotificationBySeller(order: Order) {
    const data: CreateNotificationDto = {
      id_customer: order.id_seller,
      id_product: order.id_product,
      content: 'Sản phẩm đã có người đặt',
      description: 'Hãy xác nhận đơn hàng!',
      created_at: new Date(),
      isWatched: false,
      link: 'my-orders/seller',
      isNew: true,
    };
    if (order.status == 'processing') {
      data.content = 'Xác nhận đơn hàng thành công';
      data.description = 'Bạn đã xác nhận đơn hàng thành công';
    }
    if (order.status == 'delivering') {
      data.content = 'Đơn hàng đang được giao';
      data.description = 'Đơn hàng đang được giao đến khách hàng';
    }
    if (order.status == 'delivered') {
      data.content = 'Đơn hàng đã được giao thành công';
      data.description = 'Bạn đã giao đơn hàng cho khách hàng';
    }
    if (order.status == 'cancel_exp') {
      data.content = 'Đơn hàng đã bị hủy';
      data.description = 'Đơn hàng của bạn đã bị hủy';
    }
    if (order.status == 'successful_delivery') {
      data.content = 'Đơn hàng đã hoan thanh';
      data.description = 'Đơn hàng của bạn đã hoan thanh';
    }
    return data;
  }
}
