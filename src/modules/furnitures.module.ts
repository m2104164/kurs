import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FurnituresController } from 'src/controllers/furnitures.controller';
import { FurnituresService } from 'src/services/furnitures.service';
import { Furniture } from 'src/entities/furniture.entity';
import { Material } from 'src/entities/material.entity';
import { FurnitureMaterial } from 'src/entities/furnitureMaterial.entity';


@Module({
  controllers: [FurnituresController],
  providers: [FurnituresService],
  imports: [
    TypeOrmModule.forFeature([Furniture, Material, FurnitureMaterial]),
  ],
})
export class FurnituresModule {}
