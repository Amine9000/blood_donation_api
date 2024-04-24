import { Injectable } from '@nestjs/common';
import { CreateCenterDto } from '../dto/create-center.dto';
import { UpdateCenterDto } from '../dto/update-center.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from '../entities/region.entity';
import { Like, Repository } from 'typeorm';
import { Ville } from '../entities/ville.entity';
import { Center } from '../entities/center.entity';

@Injectable()
export class CentersService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
    @InjectRepository(Ville) private villeRepository: Repository<Ville>,
    @InjectRepository(Center) private centerRepository: Repository<Center>,
  ) {}

  create(createCenterDto: CreateCenterDto) {
    const center = this.centerRepository.create({ ...createCenterDto });
    return this.centerRepository.save(center);
  }

  findAll() {
    return this.centerRepository.find({ relations: ['ville', 'ville.region'] });
  }

  search(str: string) {
    return this.centerRepository.find({
      where: {
        label: Like(`%${str}%`),
      },
      relations: ['ville', 'ville.region'],
    });
  }

  findOne(id: number) {
    return this.centerRepository.findOne({
      where: { id },
      relations: ['ville', 'ville.region'],
    });
  }

  update(id: number, updateCenterDto: UpdateCenterDto) {
    return this.centerRepository.update({ id }, { ...updateCenterDto });
  }

  remove(id: number) {
    return this.centerRepository.delete({ id });
  }

  findById(id: number) {
    return this.centerRepository.findBy({ id });
  }
}
