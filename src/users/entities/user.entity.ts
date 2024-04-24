import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Role } from './role.entity';
import { Rdv } from 'src/rdv/entities/rdv.entity';
import { Level } from './level.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ default: 0 })
  total_blood: number;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @ManyToOne(() => Level, (level) => level.users)
  level: Level;

  @OneToMany(() => Rdv, (rdv) => rdv.user)
  rdvs: Rdv[];
}
