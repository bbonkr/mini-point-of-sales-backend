import { PaymentMethod } from '../@typings/enums/paymentMethod';
import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { CustomerPayment } from './CustomerPayment';
import { Order } from './Order';
import { Store } from './Store';

@Entity({ name: 'Payments' })
export class Payment {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ default: 0, nullable: false, comment: '주문금액' })
    public orderAmount: number;
    @Column({ default: 0, nullable: false, comment: '사용 포인트' })
    public pointUsed: number;
    @Column({ default: 0, nullable: false, comment: '결재 대상 금액' })
    public amount: number;
    @Column({ default: 0, nullable: false, comment: '공급가액' })
    public value: number;
    @Column({ default: 0, nullable: false, comment: '부가세' })
    public tax: number;
    @Column({
        type: 'enum',
        enum: PaymentMethod,
        default: PaymentMethod.CARD,
        comment: '결재 방법',
    })
    public payMethod: PaymentMethod;
    @Column({ default: 0, nullable: false, comment: '할부 개월' })
    public installment: number;
    @Column({ default: 0, nullable: false, comment: '적립 포인트' })
    public pointEarned: number;
    @Column({ default: false, nullable: false, comment: '취소 여부' })
    public isCancelled: boolean;
    @Column()
    public storeId: number;
    @ManyToOne((type) => Store, (store) => store.payments)
    @JoinColumn({ name: 'storeId' })
    public store: Store;

    @Column()
    public orderId: number;

    @ManyToOne((type) => Order, (order) => order.payments)
    @JoinColumn({ name: 'orderId' })
    public order: Order;

    @OneToMany(
        (type) => CustomerPayment,
        (customerPayment) => customerPayment.payment,
    )
    public customerPayments: CustomerPayment[];
}
