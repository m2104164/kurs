import { MaterialsService } from '../services/materials.service';
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMaterialDto } from "src/dto/MaterialDTO";


@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}
  @Get()
  findAll() {
    return this.materialsService.findAll();
  }

  @Post()
  create(@Body() createMaterial: CreateMaterialDto) {
    return this.materialsService.create(createMaterial);
  }
}
