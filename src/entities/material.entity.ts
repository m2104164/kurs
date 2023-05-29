import { FurnitureMaterial } from 'src/entities/furnitureMaterial.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('materials')
export class Material {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({})
    name: string;

    @OneToMany(() => FurnitureMaterial, furnitureMaterial => furnitureMaterial.material)
    furnitureMaterials: FurnitureMaterial[];
}
