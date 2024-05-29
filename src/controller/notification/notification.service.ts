import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Notification } from './schemas/notification.schema';
import { WebSocketGateway } from 'src/web-socket/web-socket.gateway';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>,
    private readonly webSocketGateway: WebSocketGateway,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    try {
      const notification = await this.notificationModel.create(
        createNotificationDto,
      );
      this.webSocketGateway.notification(notification);
      return notification;
    } catch (error) {
      console.log('error create notification');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async findByIdCustomer(idCustomer: string) {
    try {
      const listNotification = await this.notificationModel
        .find({ id_customer: idCustomer })
        .populate('id_customer')
        .populate('id_product')
        .sort({ created_at: -1 })
        .lean()
        .exec();
      return this.handleThumbnail(listNotification);
    } catch (error) {
      console.log('error find notification by id customer');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async updateIsNewForCustomer(customerId: ObjectId): Promise<void> {
    try {
      if (!customerId) {
        return;
      }
      await this.notificationModel
        .updateMany({ id_customer: customerId }, { $set: { isNew: false } })
        .exec();
    } catch (error) {
      console.log('error update notification');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
  async updateIsWatchedForCustomer(id: string): Promise<void> {
    if (!id) return;
    try {
      await this.notificationModel.findOneAndUpdate(
        { _id: id },
        { isWatched: true },
      );
    } catch (error) {
      console.log('error update notification');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: string) {
    return `This action returns a #${id} notification`;
  }

  async update(id: string, updateNotificationDto: UpdateNotificationDto) {
    console.log('update notifi \n', updateNotificationDto);
    if (!updateNotificationDto) return;
    try {
      const update = await this.notificationModel.findByIdAndUpdate({
        _id: id,
        updateNotificationDto,
      });
      return update;
    } catch (error) {
      console.log('error update notification');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    return `This action removes a #${id} notification`;
  }

  handleThumbnail(listNotification) {
    listNotification.forEach((item) => {
      // Loop through each id_customer object in the id_customer array
      if (item.id_customer) {
        item.id_customer.forEach((customer) => {
          if (
            !customer.avata.startsWith('http://') &&
            !customer.avata.startsWith('https://')
          ) {
            customer.avata = `${process.env.URL_API}uploads/${customer.avata}`;
          }
        });
      }
      if (item.id_product) {
        const thumbnail = item.id_product[0].thumbnail[0];
        if (
          !thumbnail.startsWith('http://') &&
          !thumbnail.startsWith('https://')
        )
          item.id_product[0].thumbnail[0] = `${process.env.URL_API}uploads/${item.id_product[0].thumbnail[0]}`;
      }
    });
    return listNotification;
  }
}
