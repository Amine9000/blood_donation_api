import { Center } from 'src/centers/entities/center.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rdvs' })
export class Rdv {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ default: 1000 })
  blood_in_mils: number;

  @ManyToOne(() => Center, (center) => center.rdvs)
  @JoinColumn()
  center: Center;

  @ManyToOne(() => User, (user) => user.rdvs)
  @JoinColumn()
  user: User;
}
