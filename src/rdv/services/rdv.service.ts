import { Injectable } from '@nestjs/common';
import { CreateRdvDto } from '../dto/create-rdv.dto';
import { UpdateRdvDto } from '../dto/update-rdv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rdv } from '../entities/rdv.entity';

@Injectable()
export class RdvService {
  constructor(@InjectRepository(Rdv) private rdvRepository: Repository<Rdv>) {}
  create(createRdvDto: CreateRdvDto) {
    const rdv = this.rdvRepository.create({ ...createRdvDto });
    return this.rdvRepository.save(rdv);
  }

  findAll() {
    return this.rdvRepository.find({ relations: ['user', 'center'] });
  }

  findOne(id: number) {
    return this.rdvRepository.findOne({
      where: { id },
      relations: ['user', 'center'],
    });
  }

  update(id: number, updateRdvDto: UpdateRdvDto) {
    return this.rdvRepository.update({ id }, { ...updateRdvDto });
  }

  remove(id: number) {
    return this.rdvRepository.delete({ id });
  }
}
