import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';
import { CentersModule } from './centers/centers.module';
import { AuthModule } from './auth/auth.module';
import { RdvModule } from './rdv/rdv.module';
import { Center } from './centers/entities/center.entity';
import { Region } from './centers/entities/region.entity';
import { Ville } from './centers/entities/ville.entity';
import { Rdv } from './rdv/entities/rdv.entity';
import { Level } from './users/entities/level.entity';
import { Crenau } from './rdv/entities/crenau.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'blood_donation_db',
      entities: [User, Role, Region, Ville, Center, Rdv, Level, Crenau],
      synchronize: true,
    }),
    CentersModule,
    AuthModule,
    RdvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
