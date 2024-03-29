import { Controller, Get } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth/public';

@ApiBearerAuth()
@ApiTags('address')
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Public()
  @Get()
  findAll() {
    return this.provinceService.findAll();
  }
}
