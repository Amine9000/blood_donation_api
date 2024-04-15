import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ville } from './ville.entity';

@Entity({ name: 'centers' })
export class Center {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  label: string;

  @Column()
  address: string;

  @ManyToOne(() => Ville, (ville) => ville.centers)
  ville: Ville;
}
