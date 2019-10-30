import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Role } from './Role';
import { Store } from './Store';
import { PrimaryEntityBase } from '../@typings/Entity/PrimaryEntityBase';

@Entity({ name: 'Users' })
export class User extends PrimaryEntityBase {
    @Column({ length: 100, nullable: false, unique: true })
    public username: string;
    @Column({ length: 100, nullable: false })
    public displayName: string;
    @Column({ length: 100, nullable: false, unique: true })
    public email: string;
    @Column({ length: 500, nullable: false })
    public password: string;
    @Column({ default: false, nullable: false })
    public isEmailConfirmed: boolean;
    @Column({ length: 500, nullable: true })
    public photo: string;

    @ManyToMany((type) => Role, (role) => role.users)
    @JoinTable({
        name: 'UserRoles',
        joinColumn: { name: 'userId', referencedColumnName: 'id' },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
    })
    public roles: Role[];

    @ManyToMany((type) => Store, (store) => store.administrations)
    @JoinTable({
        name: 'StoreAdministrations',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'storeId',
            referencedColumnName: 'id',
        },
    })
    public stores: Store[];
}
