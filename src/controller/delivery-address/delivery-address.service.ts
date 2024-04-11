import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeliveryAddress } from './schemas/delivery-address.schema';

@Injectable()
export class DeliveryAddressService {
  constructor(
    @InjectModel('DeliveryAddress')
    private readonly deliveryAddressModel: Model<DeliveryAddress>,
  ) {}

  async create(createCustomerAddressDto: CreateDeliveryAddressDto) {
    try {
      if (createCustomerAddressDto.isDefault == true) {
        await this.deliveryAddressModel.updateMany(
          { id_customer: createCustomerAddressDto.id_customer },
          { isDefault: false },
        );
      }
      return this.deliveryAddressModel.create(createCustomerAddressDto);
    } catch (error) {
      console.log('error create Customer Address', error);
      throw new InternalServerErrorException();
    }
  }

  findByIdCustomer(id: string) {
    try {
      return this.deliveryAddressModel.find({ id_customer: id });
    } catch (error) {
      console.log('error find by idCustomer Address \n', error);
      throw new InternalServerErrorException();
    }
  }

  async findDefaultByIdCustomer(id: string) {
    try {
      const defaultDelivery = await this.deliveryAddressModel.find({
        id_customer: id,
        isDefault: true,
      });
      console.log(defaultDelivery);
      return defaultDelivery;
    } catch (error) {
      console.log('error find by idCustomer Address \n', error);
      throw new InternalServerErrorException();
    }
  }

  update(id: string, updateCustomerAddressDto: UpdateDeliveryAddressDto) {
    try {
      return this.deliveryAddressModel.findByIdAndUpdate(
        {
          _id: id,
        },
        updateCustomerAddressDto,
      );
    } catch (error) {
      console.log('error update Customer Address', error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      const delivery = await this.deliveryAddressModel.findById({ _id: id });
      const deleteDelivery = await this.deliveryAddressModel.findByIdAndDelete({
        _id: id,
      });
      if (delivery.isDefault == true) {
        const listDelivery = await this.deliveryAddressModel.find({
          id_customer: delivery.id_customer,
        });
        if (listDelivery.length > 0) {
          await this.deliveryAddressModel.findByIdAndUpdate(
            { _id: listDelivery[0].id },
            { isDefault: true },
          );
        }
      }
      return deleteDelivery;
    } catch (error) {
      console.log('error update Customer Address', error);
      throw new InternalServerErrorException();
    }
  }
}
