import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './controller/customer/customer.module';
import { ProductModule } from './controller/product/product.module';
import { AuthModule } from './middleware/auth/auth.module';
import { CategoryModule } from './controller/category/category.module';
import { DetailCategoryModule } from './controller/detail-category/detail-category.module';
import { SpecificationModule } from './controller/specification/specification.module';
import { ProvinceModule } from './controller/address/province/province.module';
import { DistrictModule } from './controller/address/district/district.module';
import { WardModule } from './controller/address/ward/ward.module';
import { UploadModule } from './middleware/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CustomerModule,
    ProductModule,
    AuthModule,
    CategoryModule,
    DetailCategoryModule,
    SpecificationModule,
    ProvinceModule,
    DistrictModule,
    WardModule,
    UploadModule,
  ],
})
export class AppModule {}
