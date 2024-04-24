import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Level } from '../entities/level.entity';
import { CreateLevelDto } from '../dto/create-level.dto';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level) private levelRepository: Repository<Level>,
  ) {}

  create(createLevelDto: CreateLevelDto) {
    const level = this.levelRepository.create({ ...createLevelDto });
    return this.levelRepository.save(level);
  }
  findByIds(id: number) {
    return this.levelRepository.findBy({ id: id });
  }
}
