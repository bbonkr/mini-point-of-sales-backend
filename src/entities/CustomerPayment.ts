import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Customer } from './Customer';
import { Payment } from './Payment';

@Entity({ name: 'CustomerPayments' })
export class CustomerPayment {
    @Column({ primary: true, nullable: false, comment: 'Customer.id' })
    public customerId: number;

    @Column({ primary: true, nullable: false, comment: 'Payment.id' })
    public paymentId: number;

    @ManyToOne((type) => Customer, (customer) => customer.customerPayments)
    @JoinColumn({ name: 'customerId' })
    public customer: Customer;

    @ManyToOne((type) => Payment, (payment) => payment.customerPayments)
    @JoinColumn({ name: 'paymentId' })
    public payment: Payment;
}
