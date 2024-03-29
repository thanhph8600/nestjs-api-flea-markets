import { Controller, Get, Param } from '@nestjs/common';
import { WardService } from './ward.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth/public';

@ApiBearerAuth()
@ApiTags('address')
@Controller('ward')
export class WardController {
  constructor(private readonly wardService: WardService) {}

  @Public()
  @Get()
  findAll() {
    return this.wardService.findAll();
  }

  @Public()
  @Get(':id')
  findByIdProvince(@Param('id') id: string) {
    return this.wardService.findByIdDistrict(id);
  }
}
