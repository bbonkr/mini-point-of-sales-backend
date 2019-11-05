import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
} from 'typeorm';
import { BusinessTypes } from '../@typings/enums/BusinessTypes';
import { Payment } from './Payment';
import { OrderDetail } from './OrderDetail';
import { Order } from './Order';
import { Menu } from './Menu';
import { User } from './User';
import { Customer } from './Customer';
import { PrimaryEntityBase } from '../@typings/Entity/PrimaryEntityBase';
import { IStore } from '../@typings/Entity/Entities';

@Entity({ name: 'Stores' })
export class Store extends PrimaryEntityBase implements IStore {
    @Column({ length: 100, nullable: false, comment: '매장 이름' })
    public name!: string;

    @Column({
        type: 'enum',
        enum: BusinessTypes,
        default: BusinessTypes.COFFEE,
    })
    public businessType!: BusinessTypes;

    @Column({ nullable: true, comment: '유효기간 시작' })
    public validAt!: Date;

    @Column({ nullable: true, comment: '유효기간 종료' })
    public validUntil!: Date;

    @ManyToMany((type) => User, (user) => user.stores)
    public administrations!: User[];

    @ManyToMany((type) => Customer, (customer) => customer.stores)
    public customers: Customer[];

    @OneToMany((type) => Payment, (payment) => payment.store)
    public payments: Payment[];

    @OneToMany((type) => OrderDetail, (orderDetail) => orderDetail.store)
    public orderDetails: OrderDetail[];

    @OneToMany((type) => Order, (order) => order.store)
    public orders: Order[];

    @OneToMany((type) => Menu, (menu) => menu.store)
    public menus: Menu[];
}
