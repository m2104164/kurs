import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialsController } from 'src/controllers/materials.controller';
import { MaterialsService } from 'src/services/materials.service';
import { Material } from 'src/entities/material.entity';


@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService],
  imports: [
    TypeOrmModule.forFeature([Material]),
  ],
})
export class MaterialsModule {}
