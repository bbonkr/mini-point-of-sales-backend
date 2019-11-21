import { Column, Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Payment, PaymentValue } from './Payment.entity';
import { Store, StoreValue } from './Store.entity';
import { PrimaryEntityBase, PrimaryEntity } from './PrimaryEntityBase';

export interface CustomerValue extends PrimaryEntity {
  /**
   * 휴대전화번호
   */
  mobile: string;

  /**
   * 이름
   */
  name?: string;

  stores?: StoreValue[];

  payments?: PaymentValue[];
}

@Entity({ name: 'Customers' })
export class Customer extends PrimaryEntityBase implements CustomerValue {
  @Column({ length: 20, comment: '휴대전화번호', nullable: false })
  public mobile!: string;

  @Column({ length: 50, comment: '이름', nullable: true })
  public name?: string;

  @ManyToMany(
    type => Store,
    store => store.customers
  )
  @JoinTable({
    name: 'StoreCustomers',
    joinColumn: {
      name: 'storeId',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'customerId',
      referencedColumnName: 'id'
    }
  })
  public stores!: Store[];

  @OneToMany(
    type => Payment,
    payment => payment.customer
  )
  public payments!: Payment[];
}
