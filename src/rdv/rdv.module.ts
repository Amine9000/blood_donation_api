import { Module } from '@nestjs/common';
import { RdvService } from './services/rdv.service';
import { RdvController } from './controllers/rdv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rdv } from './entities/rdv.entity';
import { Center } from 'src/centers/entities/center.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rdv, Center, User])],
  controllers: [RdvController],
  providers: [RdvService],
})
export class RdvModule {}
