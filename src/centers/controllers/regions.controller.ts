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
import { RegionsService } from '../services/regions.service';
import { CreateRegionDto } from '../dto/create-region.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/users/decorators/role.decorator';
import { ROLE } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/gards/roles.guard';

@Controller('regions')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@Roles(ROLE.ADMIN)
export class RegionsController {
  constructor(private readonly regionService: RegionsService) {}

  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    return await this.regionService.create(createRegionDto);
  }

  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createRegionDto: CreateRegionDto,
  ) {
    return await this.regionService.update(id, createRegionDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.regionService.delete(id);
  }
}
