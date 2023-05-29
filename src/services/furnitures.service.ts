import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFurnitureDto } from "src/dto/FurnitureDTO";
import { Repository, In } from "typeorm";
import { Furniture } from "../entities/furniture.entity";
import { Material } from "src/entities/material.entity";
import { FurnitureMaterial } from 'src/entities/furnitureMaterial.entity';

@Injectable()
export class FurnituresService {

  constructor(
    @InjectRepository(Furniture)
    private readonly furnitureRepository: Repository<Furniture>,
    @InjectRepository(Material)
    private readonly materialsRepository: Repository<Material>,
    @InjectRepository(FurnitureMaterial)
    private readonly furnitureMaterialRepository: Repository<FurnitureMaterial>,
  ) {}

  async create(furnitureDto: CreateFurnitureDto): Promise<Furniture> {
      const furniture = this.furnitureRepository.create();

      furniture.name = furnitureDto.name;
      await this.furnitureRepository.save(furniture);

      for (const material of furnitureDto.materials) {
          const furnitureMaterial = this.furnitureMaterialRepository.create({
              furniture,
              material: await this.materialsRepository.findOneBy({ id: material.id }),
              quantity: material.amount,
          });
          await this.furnitureMaterialRepository.save(furnitureMaterial);
      }

      return furniture;
  }

      findOne(id: number): Promise<Furniture> {
        return this.furnitureRepository.findOne({
          where: { id },
          relations: {
              furnitureMaterials: true,
          },
        });
      }

      async findAll(): Promise<Furniture[]> {
        const furnitures = await this.furnitureRepository.find({
            relations: {
                furnitureMaterials: true,
            },
        });
        return furnitures;
      }

  async update(id: number, furnitureDto: CreateFurnitureDto): Promise<Furniture> {
    const furniture = await this.furnitureRepository.findOne({ where: { id } });
    if (!furniture) {
      throw new Error("Furniture not found!");
    }

    furniture.name = furnitureDto.name;
    await this.furnitureRepository.save(furniture);

    await this.furnitureMaterialRepository.delete({ furnitureId: id });

    for (const material of furnitureDto.materials) {
      const furnitureMaterial = this.furnitureMaterialRepository.create({
        furniture,
        material: await this.materialsRepository.findOneBy({ id: material.id }),
        quantity: material.amount,
      });
      await this.furnitureMaterialRepository.save(furnitureMaterial);
    }

    return furniture;
  }


  async remove(id: number) {
  await this.furnitureMaterialRepository
    .createQueryBuilder()
    .delete()
    .where("furnitureId = :id", { id: id })
    .execute();

  await this.furnitureRepository.delete({ id });
}



}
