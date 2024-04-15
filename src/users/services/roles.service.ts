import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { In, Repository } from 'typeorm';
import { ROLE } from '../enums/role.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create({ ...createRoleDto });
    return this.roleRepository.save(role);
  }
  find(role: ROLE) {
    return this.roleRepository.findOneBy({ role });
  }
  findByIds(ids: number[]) {
    return this.roleRepository.findBy({ id: In(ids) });
  }
}
