import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { OrderDetail } from './OrderDetail';
import { Payment } from './Payment';
import { Store } from './Store';

@Entity({ name: 'Orders' })
export class Order {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ default: 0, nullable: false, comment: '주문 가격' })
    public amounts: number;
    @Column({ default: 0, nullable: false, comment: '할인 금액' })
    public discount: number;
    @Column()
    public storeId: number;

    @ManyToOne((type) => Store, (store) => store.orders)
    @JoinColumn({ name: 'storeId' })
    public store: Store;

    @OneToMany((type) => OrderDetail, (orderDetail) => orderDetail.order)
    public orderDetails: OrderDetail[];

    @OneToMany((type) => Payment, (payment) => payment.order)
    public payments: Payment[];
}
