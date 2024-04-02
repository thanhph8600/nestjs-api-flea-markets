import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const createProduct = await this.productModel.create(createProductDto);
      return createProduct;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    const listProduct = this.productModel.find();
    return listProduct;
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel
        .findById(id)
        .populate('id_category')
        .populate('id_customer')
        .populate('id_category_detail')
        .exec();
      product.thumbnail = (product.thumbnail as string[]).map((image) => {
        return `${process.env.URL_API}uploads/${image}`;
      });
      product.id_customer[0].avata = `${process.env.URL_API}uploads/${product.id_customer[0].avata}`;
      return product;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  async findByIdCategory(idCategory: string) {
    if (idCategory == '') {
      return [];
    }
    try {
      let products = await this.productModel.find({
        id_category: idCategory,
      });
      if (products.length == 0) {
        products = await this.productModel.find({
          id_category_detail: idCategory,
        });
      }
      return products;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  async findByIdCategoryDeatil(idCategoryDetail: string) {
    try {
      const products = await this.productModel.find({
        id_category_detail: idCategoryDetail,
      });
      return products;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return this.productModel.findByIdAndUpdate({ _id: id }, updateProductDto);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
