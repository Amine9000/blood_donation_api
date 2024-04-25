import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rdv } from './rdv.entity';

@Entity({ name: 'crenaux' })
export class Crenau {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  hour: number;

  @OneToMany(() => Rdv, (rdv) => rdv.crenau)
  rdvs: Rdv[];
}
