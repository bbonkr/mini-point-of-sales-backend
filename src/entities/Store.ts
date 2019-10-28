import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BusinessTypes } from '../@typings/enums/BusinessTypes';
import { StoreAdministration } from './StoreAdministration';
import { StoreCustomer } from './StoreCustomer';
import { Payment } from './Payment';
import { OrderDetail } from './OrderDetail';
import { Order } from './Order';
import { Menu } from './Menu';

@Entity({ name: 'Stores' })
export class Store {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 100, nullable: false, comment: '매장 이름' })
    public name!: string;

    @Column({
        type: 'enum',
        enum: BusinessTypes,
        default: BusinessTypes.COFFEE,
    })
    public businessType!: BusinessTypes;

    @Column({ default: new Date(), comment: '유효기간 시작' })
    public validAt!: Date;

    @Column({ default: new Date(), comment: '유효기간 종료' })
    public validUntil!: Date;

    @OneToMany(
        (type) => StoreAdministration,
        (storeAdministration) => storeAdministration.store,
    )
    public storeAdministrations!: StoreAdministration[];

    @OneToMany((type) => StoreCustomer, (storeCustomer) => storeCustomer.store)
    public storeCustomers: StoreCustomer[];

    @OneToMany((type) => Payment, (payment) => payment.store)
    public payments: Payment[];

    @OneToMany((type) => OrderDetail, (orderDetail) => orderDetail.store)
    public orderDetails: OrderDetail[];

    @OneToMany((type) => Order, (order) => order.store)
    public orders: Order[];

    @OneToMany((type) => Menu, (menu) => menu.store)
    public menus: Menu[];
}
