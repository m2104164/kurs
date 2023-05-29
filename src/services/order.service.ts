import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { OrderFurniture } from 'src/entities/order-furniture.entity';
import { CreateOrderDto } from "src/dto/OrderDTO";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderFurniture)
    private readonly orderFurnitureRepository: Repository<OrderFurniture>,
  ) {}

  async create(orderDto: CreateOrderDto): Promise<Order> {
      const order = this.orderRepository.create();

      order.deadline = orderDto.deadline;
      await this.orderRepository.save(order);

      for (const item of orderDto.items) {
          const orderFurniture = this.orderFurnitureRepository.create({
              order,
              furnitureId: item.id,
              quantity: item.amount,
          });
          await this.orderFurnitureRepository.save(orderFurniture);
      }

      return order;
  }

    findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({
        where: { id },
        relations: {
            orderFurniture: true,
        },
    });
    }

    async findAll(): Promise<Order[]> {
    const furnitures = await this.orderRepository.find({
        relations: {
            orderFurniture: true,
        },
    });
    return furnitures;
    }

  async update(id: number, orderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id } });

    order.deadline = orderDto.deadline;
    await this.orderRepository.save(order);

    await this.orderFurnitureRepository.delete({ orderId: id });

      for (const item of orderDto.items) {
          const orderFurniture = this.orderFurnitureRepository.create({
              order,
              furnitureId: item.id,
              quantity: item.amount,
          });
          await this.orderFurnitureRepository.save(orderFurniture);
      }

    return order;
  }

  async remove(id: number) {
  await this.orderFurnitureRepository
    .createQueryBuilder()
    .delete()
    .where("orderId = :id", { id: id })
    .execute();

  await this.orderRepository.delete({ id });
}
}
