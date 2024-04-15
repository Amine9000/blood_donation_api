import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ville } from './ville.entity';

@Entity({ name: 'regions' })
export class Region {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  label: string;

  @OneToMany(() => Ville, (ville) => ville.region)
  villes: Ville[];
}
