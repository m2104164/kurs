import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { OrderFurniture } from 'src/entities/order-furniture.entity'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deadline: Date;

  @OneToMany(() => OrderFurniture, orderFurniture => orderFurniture.order)
  orderFurniture: OrderFurniture[];
}
