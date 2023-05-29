import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Furniture } from 'src/entities/furniture.entity';
import { Material } from 'src/entities/material.entity';

@Entity('furniture_material')
export class FurnitureMaterial {
  @PrimaryColumn()
  furnitureId: number;

  @PrimaryColumn()
  materialId: number;

  @ManyToOne(() => Furniture, furniture => furniture.furnitureMaterials)
  furniture: Furniture;

  @ManyToOne(() => Material, material => material.furnitureMaterials)
  material: Material;

  @Column()
  quantity: number;
}
