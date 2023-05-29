import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMaterialController } from 'src/controllers/order-material.controller';
import { OrderMaterialService } from 'src/services/order-material.service';
import { OrderMaterial } from "src/entities/order-material.entity"


@Module({
  controllers: [OrderMaterialController],
  providers: [OrderMaterialService],
  imports: [
    TypeOrmModule.forFeature([OrderMaterial]),
  ],
})
export class OrderMaterialModule {}
