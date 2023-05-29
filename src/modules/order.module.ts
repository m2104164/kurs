import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from 'src/controllers/order.controller';
import { OrderService } from 'src/services/order.service';
import { Order } from 'src/entities/order.entity';
import { OrderFurniture } from 'src/entities/order-furniture.entity'


@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderFurniture]),
  ],
})
export class OrderModule {}
