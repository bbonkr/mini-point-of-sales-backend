import {
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany
} from 'typeorm';
import { User, UserValue } from './User.entity';
import { PrimaryEntityBase, PrimaryEntity } from './PrimaryEntityBase';

export interface RoleValue extends PrimaryEntity {
  /** 역할 이름 */
  name: string;

  users?: UserValue[];
}

@Entity({ name: 'Roles' })
export class Role extends PrimaryEntityBase implements RoleValue {
  @Column({ length: 100, nullable: false, comment: '역할이름' })
  public name!: string;

  @ManyToMany(
    type => User,
    user => user.roles
  )
  public users!: User[];
}
