import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth/public';

@ApiBearerAuth()
@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Public()
  @Get()
  findAll() {
    console.log('get all product');
    return this.productService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Public()
  @Get('category/:idCategory')
  findByIdCategory(@Param('idCategory') idCategory: string) {
    return this.productService.findByIdCategory(idCategory);
  }

  @Public()
  @Get('category-detail/:idCategoryDetail')
  findByIdCategoryDetail(@Param('idCategoryDetail') idCategoryDetail: string) {
    return this.productService.findByIdCategoryDeatil(idCategoryDetail);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
