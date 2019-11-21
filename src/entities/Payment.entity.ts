import { PaymentMethod } from '../lib/enums/paymentMethod';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Order, OrderValue } from './Order.entity';
import { Store, StoreValue } from './Store.entity';
import { Customer, CustomerValue } from './Customer.entity';
import { PrimaryEntityBase, PrimaryEntity } from './PrimaryEntityBase';

export interface PaymentValue extends PrimaryEntity {
  /** 주문금액 */
  orderAmount: number;

  /** 사용 포인트 */
  pointUsed: number;

  /** 결재 대상 금액 */
  amount: number;

  /** 공급가액 */
  value: number;

  /** 부가세 */
  tax: number;

  /** 결재방법 */
  payMethod: PaymentMethod;

  /** 할부 개월 */
  installment: number;

  /** 적립 포인트 */
  pointEarned: number;

  /** 취소 여부 */
  isCancelled: boolean;

  storeId: string;

  store: StoreValue;

  orderId: string;

  order: OrderValue;

  customerId: string;

  customer: CustomerValue;
}

@Entity({ name: 'Payments' })
export class Payment extends PrimaryEntityBase implements PaymentValue {
  @Column({ default: 0, nullable: false, comment: '주문금액' })
  public orderAmount!: number;
  @Column({ default: 0, nullable: false, comment: '사용 포인트' })
  public pointUsed!: number;
  @Column({ default: 0, nullable: false, comment: '결재 대상 금액' })
  public amount!: number;
  @Column({ default: 0, nullable: false, comment: '공급가액' })
  public value!: number;
  @Column({ default: 0, nullable: false, comment: '부가세' })
  public tax!: number;
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CARD,
    comment: '결재 방법'
  })
  public payMethod!: PaymentMethod;
  @Column({ default: 0, nullable: false, comment: '할부 개월' })
  public installment!: number;
  @Column({ default: 0, nullable: false, comment: '적립 포인트' })
  public pointEarned!: number;
  @Column({ default: false, nullable: false, comment: '취소 여부' })
  public isCancelled!: boolean;
  @Column()
  public storeId!: string;
  @ManyToOne(
    type => Store,
    store => store.payments
  )
  @JoinColumn({ name: 'storeId' })
  public store!: Store;

  @Column()
  public orderId!: string;

  @ManyToOne(
    type => Order,
    order => order.payments
  )
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  public order!: Order;

  @Column()
  public customerId!: string;

  @ManyToOne(
    type => Customer,
    customer => customer.payments
  )
  @JoinColumn({ name: 'customerId', referencedColumnName: 'id' })
  public customer!: Customer;
}
