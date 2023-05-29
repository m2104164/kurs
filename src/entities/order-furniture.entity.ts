import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Furniture } from 'src/entities/furniture.entity';
import { Order } from 'src/entities/order.entity';

@Entity('order_furniture')
export class OrderFurniture {
  @PrimaryColumn()
  furnitureId: number;

  @PrimaryColumn()
  orderId: number;

  @ManyToOne(() => Furniture)
  @JoinColumn({ name: 'furnitureId' })
  furniture: Furniture;

  @ManyToOne(() => Order, order => order.orderFurniture)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @Column()
  quantity: number;
}
