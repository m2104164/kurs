import { OrderMaterialService } from '../services/order-material.service';
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@Controller('order_material')
export class OrderMaterialController {
  constructor(private readonly orderMaterialService: OrderMaterialService) {}
  @Get()
  findAll() {
    return this.orderMaterialService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderMaterialService.findById(+id);
  }
}
