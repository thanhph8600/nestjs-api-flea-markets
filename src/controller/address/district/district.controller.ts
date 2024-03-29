import { Controller, Get, Param } from '@nestjs/common';
import { DistrictService } from './district.service';
import { Public } from 'src/middleware/auth/public';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('address')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @Public()
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @Public()
  @Get(':id')
  findByIdProvince(@Param('id') id: string) {
    return this.districtService.findByIDProvince(id);
  }
}
