import { Module } from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { DeliveryAddressController } from './delivery-address.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DeliveryAddress,
  DeliveryAddressSchema,
} from './schemas/delivery-address.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryAddress.name, schema: DeliveryAddressSchema },
    ]),
  ],
  controllers: [DeliveryAddressController],
  providers: [DeliveryAddressService],
})
export class DeliveryAddressModule {}
