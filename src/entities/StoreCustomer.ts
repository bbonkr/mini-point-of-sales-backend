import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Store } from './Store';
import { Customer } from './Customer';

@Entity({ name: 'StoreCustomers' })
export class StoreCustomer {
    @Column({ primary: true, nullable: false })
    public storeId: number;
    @Column({ primary: true, nullable: false })
    public customerId: number;

    @ManyToOne((type) => Store, (store) => store.storeCustomers)
    @JoinColumn({ name: 'storeId' })
    public store: Store;

    @ManyToOne((type) => Customer, (customer) => customer.storeCustomers)
    @JoinColumn({ name: 'customerId' })
    public custmer: Customer;
}
