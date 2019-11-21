import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany
} from 'typeorm';
import { BusinessTypes } from '../lib/enums/BusinessTypes';
import { Payment, PaymentValue } from './Payment.entity';
import { OrderDetail, OrderDetailValue } from './OrderDetail.entity';
import { Order, OrderValue } from './Order.entity';
import { Menu, MenuValue } from './Menu.entity';
import { User, UserValue } from './User.entity';
import { Customer, CustomerValue } from './Customer.entity';
import { PrimaryEntityBase, PrimaryEntity } from './PrimaryEntityBase';
import { StorePeriod } from './StorePeriod.entity';

export interface StoreValue extends PrimaryEntity {
  /** 매장 이름 */
  name: string;

  /** 업종 - 필드 정리 필요 */
  businessType: BusinessTypes;

  /** 유효기간 시작 */
  validAt?: Date;

  /** 유효기간 종료 */
  validUntil?: Date;

  administrations?: UserValue[];

  customers?: CustomerValue[];

  payments?: PaymentValue[];

  orderDetails?: OrderDetailValue[];

  orders?: OrderValue[];

  menus?: MenuValue[];
}

@Entity({ name: 'Stores' })
export class Store extends PrimaryEntityBase implements StoreValue {
  @Column({ length: 100, nullable: false, comment: '매장 이름' })
  public name!: string;

  @Column({
    type: 'enum',
    enum: BusinessTypes,
    default: BusinessTypes.COFFEE
  })
  public businessType!: BusinessTypes;

  @Column({ nullable: true, comment: '유효기간 시작' })
  public validAt!: Date;

  @Column({ nullable: true, comment: '유효기간 종료' })
  public validUntil!: Date;

  @ManyToMany(
    type => User,
    user => user.stores
  )
  public administrations!: User[];

  @ManyToMany(
    type => Customer,
    customer => customer.stores
  )
  public customers!: Customer[];

  @OneToMany(
    type => Payment,
    payment => payment.store
  )
  public payments!: Payment[];

  @OneToMany(
    type => OrderDetail,
    orderDetail => orderDetail.store
  )
  public orderDetails!: OrderDetail[];

  @OneToMany(
    type => Order,
    order => order.store
  )
  public orders!: Order[];

  @OneToMany(
    type => Menu,
    menu => menu.store
  )
  public menus!: Menu[];

  @OneToMany(
    type => StorePeriod,
    period => period.storeId
  )
  public periods!: StorePeriod[];
}
