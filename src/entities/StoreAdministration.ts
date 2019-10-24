import { PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Store } from './Store';
import { User } from './User';

export class StoreAdministration {
    @PrimaryGeneratedColumn()
    public storeAdministrationId: number;

    @Column()
    public storeId!: number;

    @Column()
    public userId!: number;

    @ManyToOne((type) => Store, (store) => store.storeAdministrations)
    public store: Store;

    @ManyToOne((type) => User, (user) => user.storeAdministrations)
    public user: User;
}
