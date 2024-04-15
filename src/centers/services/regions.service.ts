import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from '../dto/create-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from '../entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region) private regionRepository: Repository<Region>,
  ) {}

  create(createRegionDto: CreateRegionDto) {
    const region = this.regionRepository.create({ ...createRegionDto });
    return this.regionRepository.save(region);
  }

  findAll() {
    return this.regionRepository.find();
  }

  findOne(id: number) {
    return this.regionRepository.findOneBy({ id });
  }

  update(id: number, createRegionDto: CreateRegionDto) {
    return this.regionRepository.update({ id }, { ...createRegionDto });
  }

  delete(id: number) {
    return this.regionRepository.delete({ id });
  }
}
