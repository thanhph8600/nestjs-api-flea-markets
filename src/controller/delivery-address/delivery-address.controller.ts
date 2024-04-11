import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('delivery address')
@Controller('delivery-address')
export class DeliveryAddressController {
  constructor(
    private readonly deliveryAddressService: DeliveryAddressService,
  ) {}

  @Post()
  create(@Body() createDeliveryAddressDto: CreateDeliveryAddressDto) {
    return this.deliveryAddressService.create(createDeliveryAddressDto);
  }

  @Get(':idCustomer')
  findOne(@Param('idCustomer') idCustomer: string) {
    return this.deliveryAddressService.findDefaultByIdCustomer(idCustomer);
  }

  @Get('customer/:idCustomer')
  findByIdCustomer(@Param('idCustomer') id: string) {
    return this.deliveryAddressService.findByIdCustomer(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryAddressDto: UpdateDeliveryAddressDto,
  ) {
    return this.deliveryAddressService.update(id, updateDeliveryAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryAddressService.remove(id);
  }
}
