import {
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    Entity,
} from 'typeorm';
import { Store } from './Store';
import { User } from './User';

@Entity({ name: 'StoreAdministrations' })
export class StoreAdministration {
    @Column({ primary: true, nullable: false })
    public storeId!: number;

    @Column({ primary: true, nullable: false })
    public userId!: number;

    @ManyToOne((type) => Store, (store) => store.storeAdministrations)
    @JoinColumn({ name: 'storeId' })
    public store: Store;

    @ManyToOne((type) => User, (user) => user.storeAdministrations)
    @JoinColumn({ name: 'userId' })
    public user: User;
}
