import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFurnitureDto } from "src/dto/FurnitureDTO";
import { Repository, In } from "typeorm";
import { OrderMaterial } from "src/entities/order-material.entity"

@Injectable()
export class OrderMaterialService {

  constructor(
    @InjectRepository(OrderMaterial)
    private readonly orderMaterialRepository: Repository<OrderMaterial>,
  ) {}


      async findById(orderId: number): Promise<OrderMaterial[]> {
        return this.orderMaterialRepository.find({
          where: { orderId }, //указываем условие поиска по id
        });
      }

      async findAll(): Promise<OrderMaterial[]> {
        const furnitures = await this.orderMaterialRepository.find({
        });
        return furnitures;
      }
}
