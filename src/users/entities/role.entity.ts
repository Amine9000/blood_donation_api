import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from '../enums/role.enum';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  role: ROLE;
}
