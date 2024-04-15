import { Injectable } from '@nestjs/common';
import { CreateCenterDto } from '../dto/create-center.dto';
import { UpdateCenterDto } from '../dto/update-center.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from '../entities/region.entity';
import { Repository } from 'typeorm';
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
    return this.centerRepository.find({ relations: ['ville'] });
  }

  findOne(id: number) {
    return this.centerRepository.findOneBy({ id });
  }

  update(id: number, updateCenterDto: UpdateCenterDto) {
    return this.centerRepository.update({ id }, { ...updateCenterDto });
  }

  remove(id: number) {
    return `This action removes a #${id} center`;
  }
}
