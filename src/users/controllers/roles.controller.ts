import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from '../gards/roles.guard';
import { Roles } from '../decorators/role.decorator';
import { ROLE } from '../enums/role.enum';

@Controller('roles')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@Roles(ROLE.ADMIN)
export class RolesController {
  constructor(
    private readonly roleService: RolesService,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    await this.roleService.create(createRoleDto);
  }
}
