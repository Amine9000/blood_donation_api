import { Center } from 'src/centers/entities/center.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Crenau } from './crenau.entity';

@Entity({ name: 'rdvs' })
export class Rdv {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Center, (center) => center.rdvs)
  center: Center;

  @ManyToOne(() => User, (user) => user.rdvs)
  user: User;

  @ManyToOne(() => Crenau, (crenau) => crenau.rdvs)
  crenau: Crenau;
}
