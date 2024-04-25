import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateVilleDto } from '../dto/create-ville.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ville } from '../entities/ville.entity';
import { Repository } from 'typeorm';
import { RegionsService } from './regions.service';

@Injectable()
export class VillesService {
  constructor(
    @InjectRepository(Ville) private villeRepository: Repository<Ville>,
    private regionService: RegionsService,
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
  async findByRegion(regionId: number) {
    const region = await this.regionService.findOne(regionId);
    if (!region) {
      throw new HttpException(
        'no region with this id ' + regionId,
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.villeRepository.find({
      where: { region: region },
      relations: ['centers'],
    });
  }
}
