import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth/public';

@ApiBearerAuth()
@ApiTags('customers')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Public()
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @Public()
  @Get('phone/:phone')
  findOneByPhone(@Param('phone') phone: string) {
    return this.customerService.findOneWithPhone(phone);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Patch('update-password/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() update: { password: string; newPassword: string },
  ) {
    return this.customerService.updatePassword(
      id,
      update.password,
      update.newPassword,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
