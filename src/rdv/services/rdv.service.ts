import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRdvDto } from '../dto/create-rdv.dto';
import { UpdateRdvDto } from '../dto/update-rdv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rdv } from '../entities/rdv.entity';
import { UsersService } from 'src/users/services/users.service';
import { CentersService } from 'src/centers/services/centers.service';

@Injectable()
export class RdvService {
  constructor(
    @InjectRepository(Rdv) private rdvRepository: Repository<Rdv>,
    private userService: UsersService,
    private centerService: CentersService,
  ) {}
  async create(createRdvDto: CreateRdvDto) {
    const { userId, centerId } = createRdvDto;
    const user = await this.userService.findById(userId);
    const center = await this.centerService.findById(centerId);
    const rdv = this.rdvRepository.create({ ...createRdvDto });
    if (!user)
      throw new HttpException(
        'no user with this id ' + userId,
        HttpStatus.BAD_REQUEST,
      );
    if (!user)
      throw new HttpException(
        'no center with this id ' + centerId,
        HttpStatus.BAD_REQUEST,
      );
    rdv.user = user[0];
    delete rdv.user.password;
    rdv.center = center[0];
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
