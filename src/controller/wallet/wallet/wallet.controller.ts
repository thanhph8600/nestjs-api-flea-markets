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
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthGuard } from 'src/middleware/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@ApiBearerAuth()
@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Get('customer/:idCustomer')
  findOneByIdCustomer(@Request() req) {
    return this.walletService.findOneByIdCustomer(req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(id);
  }
}
