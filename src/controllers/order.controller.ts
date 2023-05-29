import { OrderService } from '../services/order.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from "src/dto/OrderDTO";


@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrder: CreateOrderDto) {
    return this.orderService.create(createOrder);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() createOrder: CreateOrderDto): Promise<Order> {
    return this.orderService.update(id, createOrder);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
