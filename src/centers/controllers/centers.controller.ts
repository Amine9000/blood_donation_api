import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CentersService } from '../services/centers.service';
import { CreateCenterDto } from '../dto/create-center.dto';
import { UpdateCenterDto } from '../dto/update-center.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/users/decorators/role.decorator';
import { ROLE } from 'src/users/enums/role.enum';
import { RolesGuard } from 'src/users/gards/roles.guard';

@Controller('centers')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  @Post()
  @Roles(ROLE.ADMIN)
  async create(@Body() createCenterDto: CreateCenterDto) {
    return await this.centersService.create(createCenterDto);
  }

  @Get()
  findAll() {
    return this.centersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(ROLE.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateCenterDto: UpdateCenterDto,
  ) {
    return await this.centersService.update(+id, updateCenterDto);
  }

  @Delete(':id')
  @Roles(ROLE.ADMIN)
  async remove(@Param('id') id: string) {
    return await this.centersService.remove(+id);
  }
}
