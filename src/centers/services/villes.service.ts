import { Injectable } from '@nestjs/common';
import { CreateVilleDto } from '../dto/create-ville.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ville } from '../entities/ville.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VillesService {
  constructor(
    @InjectRepository(Ville) private villeRepository: Repository<Ville>,
  ) {}

  create(createVilleDto: CreateVilleDto) {
    const ville = this.villeRepository.create({ ...createVilleDto });
    return this.villeRepository.save(ville);
  }

  findAll() {
    return this.villeRepository.find({ relations: ['region'] });
  }

  findOne(id: number) {
    return this.villeRepository.findOneBy({ id });
  }

  update(id: number, createVilleDto: CreateVilleDto) {
    return this.villeRepository.update({ id }, { ...createVilleDto });
  }

  delete(id: number) {
    return this.villeRepository.delete({ id });
  }
}
