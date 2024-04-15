import { Module } from '@nestjs/common';
import { CentersService } from './services/centers.service';
import { CentersController } from './controllers/centers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Ville } from './entities/ville.entity';
import { Center } from './entities/center.entity';
import { VillesService } from './services/villes.service';
import { RegionsService } from './services/regions.service';
import { RegionsController } from './controllers/regions.controller';
import { VillesController } from './controllers/villes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Region, Ville, Center])],
  controllers: [CentersController, RegionsController, VillesController],
  providers: [CentersService, VillesService, RegionsService],
})
export class CentersModule {}
