import { FurnitureMaterial } from 'src/entities/furnitureMaterial.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('furnitures')
export class Furniture {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({})
    name: string;

    @OneToMany(() => FurnitureMaterial, furnitureMaterial => furnitureMaterial.furniture)
    furnitureMaterials: FurnitureMaterial[];
}
