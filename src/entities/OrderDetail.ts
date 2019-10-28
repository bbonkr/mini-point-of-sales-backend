import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Store } from './Store';
import { Order } from './Order';

@Entity({ name: 'OrderDetails' })
export class OrderDetail {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 100, nullable: false, comment: '메뉴 이름' })
    public name: string;

    @Column({ default: 0, nullable: false, comment: '메뉴 단품 가격' })
    public price: number;

    @Column({ default: 0, nullable: false, comment: '수량' })
    public quantity: number;

    @Column({ default: 0, nullable: false, comment: '할인' })
    public discount: number;

    @Column({ default: false, nullable: false, comment: '포장여부' })
    public takeout: boolean;

    @Column()
    public storeId: number;

    @ManyToOne((type) => Store, (store) => store.orderDetails)
    @JoinColumn({ name: 'storeId' })
    public store: Store;

    @Column()
    public orderId: number;

    @ManyToOne((type) => Order, (order) => order.orderDetails)
    @JoinColumn({ name: 'orderId' })
    public order: Order;
}
