import { FurnituresService } from '../services/furnitures.service';
import { Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { Furniture } from '../entities/furniture.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateFurnitureDto } from "src/dto/FurnitureDTO";

import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from "src/authorization/roles/roles.decorator";
import { Role } from "src/authorization/roles/role.enum";
import { JwtAuthGuard } from "src/authorization/jwt/jwt-auth.guard";
import { RolesGuard } from "src/authorization/roles/roles.guard";
import { UseGuards } from '@nestjs/common';


@Controller('furnitures')
export class FurnituresController {
  constructor(private readonly furnituresService: FurnituresService) {}
  @Get()
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  findAll() {
    return this.furnituresService.findAll();
  }
  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.furnituresService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() furnitureDto: CreateFurnitureDto): Promise<Furniture> {
    return this.furnituresService.update(id, furnitureDto);
  }


  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  create(@Body() createFurniture: CreateFurnitureDto) {
    return this.furnituresService.create(createFurniture);
  }
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.furnituresService.remove(+id);
  }
}
