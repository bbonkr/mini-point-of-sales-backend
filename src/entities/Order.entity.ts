import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderDetail, OrderDetailValue } from './OrderDetail.entity';
import { Payment, PaymentValue } from './Payment.entity';
import { Store, StoreValue } from './Store.entity';
import { PrimaryEntityBase, PrimaryEntity } from './PrimaryEntityBase';

export interface OrderValue extends PrimaryEntity {
  /** 주문 가격 */
  amounts: number;

  /** 할인 금액 */
  discount: number;

  storeId?: string;

  store?: StoreValue;

  orderDetails?: OrderDetailValue[];

  payments?: PaymentValue[];
}

@Entity({ name: 'Orders' })
export class Order extends PrimaryEntityBase implements OrderValue {
  @Column({ default: 0, nullable: false, comment: '주문 가격' })
  public amounts!: number;
  @Column({ default: 0, nullable: false, comment: '할인 금액' })
  public discount!: number;
  @Column()
  public storeId!: string;

  @ManyToOne(
    type => Store,
    store => store.orders
  )
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  public store!: Store;

  @OneToMany(
    type => OrderDetail,
    orderDetail => orderDetail.order
  )
  public orderDetails!: OrderDetail[];

  @OneToMany(
    type => Payment,
    payment => payment.order
  )
  public payments!: Payment[];
}
