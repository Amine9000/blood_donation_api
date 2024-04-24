import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesController } from './controllers/roles.controller';
import { RolesService } from './services/roles.service';
import { Role } from './entities/role.entity';
import { Level } from './entities/level.entity';
import { LevelsService } from './services/levels.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Level])],
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService, LevelsService],
  exports: [UsersService],
})
export class UsersModule {}
