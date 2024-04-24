import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ville } from './ville.entity';
import { Rdv } from 'src/rdv/entities/rdv.entity';

@Entity({ name: 'centers' })
export class Center {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  label: string;

  @Column()
  address: string;

  @Column()
  capacity: number;

  @ManyToOne(() => Ville, (ville) => ville.centers)
  ville: Ville;

  @OneToMany(() => Rdv, (rdv) => rdv.center)
  rdvs: Rdv[];
}
