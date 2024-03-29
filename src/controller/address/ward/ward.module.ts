import { Module } from '@nestjs/common';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ward, WardSchema } from './schemas/ward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Ward.name,
        schema: WardSchema,
      },
    ]),
  ],
  controllers: [WardController],
  providers: [WardService],
})
export class WardModule {}
