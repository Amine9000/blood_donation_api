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
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @ManyToOne(() => Center)
  @JoinColumn()
  center: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: number;
}
