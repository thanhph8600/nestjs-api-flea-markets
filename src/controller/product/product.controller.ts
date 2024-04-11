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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/middleware/auth/public';
import { AuthGuard } from 'src/middleware/auth/auth.guard';
import { ObjectId } from 'mongoose';

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
  findOne(@Param('id') id: ObjectId) {
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

  @Public()
  @Get('search-product/:query')
  searchProduct(@Param('query') query: string) {
    return this.productService.findBySearch(query);
  }

  @UseGuards(AuthGuard)
  @Get('customer/:id')
  findProductByCustomer(@Request() req) {
    return this.productService.findByIdCustomer(req.user.sub);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId) {
    return this.productService.remove(id);
  }
}
