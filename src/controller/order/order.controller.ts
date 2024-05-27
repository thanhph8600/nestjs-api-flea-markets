import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/middleware/auth/auth.guard';
import { ObjectId } from 'mongoose';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('seller/:idSeller')
  findByIdSeller(@Request() req) {
    if (!req.user) return;
    return this.orderService.findByIdSeller(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('buyer/:idBuyer')
  findByIdBuyer(@Request() req) {
    if (!req.user) return;
    return this.orderService.findByIdBuyer(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateOrderDto: UpdateOrderDto,
    @Request() req,
  ) {
    return this.orderService.update(id, updateOrderDto, req.user.sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
