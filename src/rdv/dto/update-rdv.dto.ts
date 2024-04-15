import { PartialType } from '@nestjs/mapped-types';
import { CreateRdvDto } from './create-rdv.dto';

export class UpdateRdvDto extends PartialType(CreateRdvDto) {}
