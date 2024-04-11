import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
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

  async findAll() {
    try {
      const listProduct = await this.productModel
        .find({
          status: 'complete',
          end_at: { $gte: new Date() },
          isHidden: false,
        })
        .sort({ created_at: -1 })
        .lean();
      this.handleStatusProduct();
      const newProduct = this.handleThumbnailProduct(listProduct);
      return newProduct;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: ObjectId) {
    try {
      const product = await this.productModel
        .findById(id)
        .populate('id_category')
        .populate('id_customer')
        .populate('id_category_detail');
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
      let products = await this.productModel
        .find({
          id_category: idCategory,
          status: 'complete',
          isHidden: false,
        })
        .sort({ created_at: -1 })
        .lean();
      if (products.length == 0) {
        products = await this.productModel.find({
          id_category_detail: idCategory,
        });
      }
      const newProduct = this.handleThumbnailProduct(products);
      return newProduct;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  async findByIdCategoryDeatil(idCategoryDetail: string) {
    try {
      const products = await this.productModel
        .find({
          id_category_detail: idCategoryDetail,
          status: 'complete',
          isHidden: false,
        })
        .sort({ created_at: -1 })
        .lean();
      const newProduct = this.handleThumbnailProduct(products);
      return newProduct;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  async findBySearch(querySearch: string) {
    try {
      const products = await this.productModel
        .find({
          title: { $regex: querySearch, $options: 'i' },
          isHidden: false,
        })
        .sort({ created_at: -1 })
        .limit(10);
      return products;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  async findByIdCustomer(idCustomer: string) {
    this.handleStatusProduct();
    try {
      const products = await this.productModel
        .find({
          id_customer: idCustomer,
          isHidden: false,
        })
        .sort({ created_at: -1 })
        .lean();
      const newProduct = this.handleThumbnailProduct(products);
      return newProduct;
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  async update(id: ObjectId, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productModel.findById(id);
      const date = new Date();
      if (updateProductDto.status == 'complete') {
        if (product.end_at.getTime() <= date.getTime()) {
          updateProductDto.status = 'expired';
        }
      }
      if (updateProductDto.status == 'extend') {
        updateProductDto.status = 'complete';
        date.setDate(date.getDate() + 30);
        updateProductDto.end_at = date;
      }

      return this.productModel.findByIdAndUpdate({ _id: id }, updateProductDto);
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  remove(id: ObjectId) {
    return `This action removes a #${id} product`;
  }

  handleThumbnailProduct(listProduct) {
    const updatedProducts = listProduct.map((product) => {
      const updatedThumbnail = product.thumbnail.map((imageUrl) => {
        return `${process.env.URL_API}uploads/${imageUrl}`;
      });
      return { ...product, thumbnail: updatedThumbnail };
    });
    return updatedProducts;
  }

  async handleStatusProduct() {
    const listProduct = await this.productModel
      .find({ status: 'complete', end_at: { $lt: new Date() } })
      .lean();
    listProduct.map((product) => {
      this.update(product._id, { status: 'expired' });
    });
  }
}
