import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Role, RoleValue } from './Role.entity';
import { Store, StoreValue } from './Store.entity';
import { PrimaryEntityBase, PrimaryEntity } from './PrimaryEntityBase';

export interface UserValue extends PrimaryEntity {
  /** 사용자 계정 이름 */
  username: string;

  /** 사용자 이름 */
  displayName: string;

  /** 전자우편주소 */
  email: string;

  /** 비밀번호 */
  password?: string;

  /** 전자우편주소 확인 여부 */
  isEmailConfirmed: boolean;

  /** 사용자 이미지 URL */
  photo: string;

  /** 역할 */
  roles?: RoleValue[];

  /** 관리 매장 */
  stores: StoreValue[];
}

@Entity({ name: 'Users' })
export class User extends PrimaryEntityBase implements UserValue {
  @Column({ length: 100, nullable: false, unique: true })
  public username!: string;

  @Column({ length: 100, nullable: false })
  public displayName!: string;

  @Column({ length: 100, nullable: false, unique: true })
  public email!: string;

  @Column({ length: 500, nullable: false })
  public password!: string;

  @Column({ default: false, nullable: false })
  public isEmailConfirmed!: boolean;

  @Column({ length: 500, nullable: true })
  public photo!: string;

  @ManyToMany(
    type => Role,
    role => role.users
  )
  @JoinTable({
    name: 'UserRoles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'id'
    }
  })
  public roles!: Role[];

  @ManyToMany(
    type => Store,
    store => store.administrations
  )
  @JoinTable({
    name: 'StoreAdministrations',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'storeId',
      referencedColumnName: 'id'
    }
  })
  public stores!: Store[];
}
