import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { CustomerPayment } from './CustomerPayment';
import { StoreCustomer } from './StoreCustomer';

@Entity({ name: 'Customers' })
export class Customer {
    @PrimaryGeneratedColumn({ comment: '식별자' })
    public id: number;

    @Column({ length: 20, comment: '휴대전화번호', nullable: false })
    public mobile: string;

    @Column({ length: 50, comment: '이름', nullable: true })
    public name?: string;

    // public stores: Store[];
    @OneToMany(
        (type) => StoreCustomer,
        (storeCustomer) => storeCustomer.custmer,
    )
    public storeCustomers: StoreCustomer[];

    // public payments: Payment[];
    @OneToMany(
        (type) => CustomerPayment,
        (customerPayment) => customerPayment.payment,
    )
    public customerPayments: CustomerPayment[];
}
