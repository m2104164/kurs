import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMaterialDto } from "src/dto/MaterialDTO";
import { Repository } from "typeorm";
import { Material } from "src/entities/material.entity";

@Injectable()
export class MaterialsService {

  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
  ) {}

  async create(materialDto: CreateMaterialDto): Promise<Material> {
      const material = this.materialRepository.create();


      material.name = materialDto.name;

      await this.materialRepository.save(material);
      return material;

  }

      async findAll(): Promise<Material[]> {
        const materials = await this.materialRepository.find();
        return materials;
      }
}
