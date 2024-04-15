import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VillesService } from '../services/villes.service';
import { CreateVilleDto } from '../dto/create-ville.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/users/decorators/role.decorator';
import { ROLE } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/gards/roles.guard';

@Controller('villes')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@Roles(ROLE.ADMIN)
export class VillesController {
  constructor(private readonly villesService: VillesService) {}

  @Post()
  create(@Body() createVilleDto: CreateVilleDto) {
    this.villesService.create(createVilleDto);
  }

  @Get()
  findAll() {
    return this.villesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.villesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createVilleDto: CreateVilleDto,
  ) {
    return await this.villesService.update(id, createVilleDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.villesService.delete(id);
  }
}
