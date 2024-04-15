import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from './region.entity';
import { Center } from './center.entity';

@Entity({ name: 'villes' })
export class Ville {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  label: string;

  @ManyToOne(() => Region, (region) => region.villes)
  region: Region;

  @OneToMany(() => Center, (center) => center.ville)
  centers: Center[];
}
