import { Module } from '@nestjs/common';
import { SpecificationService } from './specification.service';
import { SpecificationController } from './specification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Specification,
  SpecificationSchema,
} from './schemas/specitfication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Specification.name,
        schema: SpecificationSchema,
      },
    ]),
  ],
  controllers: [SpecificationController],
  providers: [SpecificationService],
})
export class SpecificationModule {}
