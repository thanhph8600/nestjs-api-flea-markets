import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './schemas/wallet.schema';
import { CreateHistoryDto } from '../history/dto/create-history.dto';
import { HistoryService } from '../history/history.service';
import { NotificationService } from 'src/controller/notification/notification.service';
import { CreateNotificationDto } from 'src/controller/notification/dto/create-notification.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<Wallet>,
    @Inject(forwardRef(() => HistoryService))
    private readonly historyService: HistoryService,
    private readonly notificaionService: NotificationService,
  ) {}
  create(createWalletDto: CreateWalletDto) {
    try {
      return this.walletModel.create(createWalletDto);
    } catch (error) {
      console.log('erro create wallet');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: string) {
    return `This action returns a #${id} wallet`;
  }

  async findOneByIdCustomer(idCustomer: ObjectId) {
    try {
      const wallet = await this.walletModel
        .findOne({
          id_customer: idCustomer,
        })
        .populate('id_customer');
      if (!wallet) {
        return this.walletModel.create({
          id_customer: idCustomer,
        });
      }
      return wallet;
    } catch (error) {
      console.log('error find id customer wallet');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(id: ObjectId, updateWalletDto: UpdateWalletDto) {
    console.log(updateWalletDto);
    try {
      const wallet = await this.walletModel.findById(id);
      if (updateWalletDto.method == 'plus') {
        wallet.current_amount += Number(updateWalletDto.amount);
      }
      if (updateWalletDto.method == 'minus') {
        wallet.current_amount -= Number(updateWalletDto.amount);
      }
      if (updateWalletDto.method == 'tax') {
        wallet.current_amount -= Number(updateWalletDto.amount);
        wallet.sales_tax += Number(updateWalletDto.amount);
      }
      if (wallet.current_amount < 0)
        return new HttpException('Số tiền còn lại không đủ', 419);

      updateWalletDto.current_amount = wallet.current_amount;
      await this.historyService.create(
        this.formDataCreateHistory(wallet._id, updateWalletDto),
      );
      await this.notificaionService.create(
        this.formDataCreateNotification(wallet.id_customer, updateWalletDto),
      );
      const newWallet = await this.walletModel.findByIdAndUpdate(
        { _id: id },
        wallet,
      );
      return newWallet;
    } catch (error) {
      console.log('error update wallet');
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    return `This action removes a #${id} wallet`;
  }

  formDataCreateHistory(id_wallet: ObjectId, createHistory: UpdateWalletDto) {
    const data: CreateHistoryDto = {
      id_wallet,
      transaction: '',
      content: createHistory.content,
      amount: createHistory.amount,
      current_amount: createHistory.current_amount,
      created_at: new Date(),
    };
    if (createHistory.method == 'plus') {
      data.transaction = 'Nạp tiền';
    }
    if (createHistory.method == 'minus') {
      data.transaction = 'Thanh toán';
    }
    if (createHistory.method == 'tax') {
      data.transaction = 'Đóng thuế';
    }
    return data;
  }

  formDataCreateNotification(
    id_customer: ObjectId,
    createHistory: UpdateWalletDto,
  ) {
    const data: CreateNotificationDto = {
      id_customer,
      id_product: null,
      content: 'Biến động số dư',
      description: '',
      created_at: new Date(),
      isWatched: false,
      link: '/wallet',
      isNew: true,
    };
    if (createHistory.method == 'plus') {
      data.description = `+ ${createHistory.amount} `;
    }
    if (createHistory.method == 'minus') {
      data.description = `- ${createHistory.amount} `;
    }
    if (createHistory.method == 'tax') {
      data.description = `- ${createHistory.amount} `;
    }
    return data;
  }
}
