import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from './Role';
import { UserRole } from './UserRole';
import { StoreAdministration } from './StoreAdministration';

@Entity({ name: 'Users' })
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 100 })
    public username: string;
    @Column({ length: 100 })
    public displayName: string;
    @Column({ length: 100 })
    public email: string;
    @Column({ length: 500 })
    public password: string;
    @Column()
    public isEmailConfirmed: boolean;
    @Column({ length: 500 })
    public photo: string;
    // @OneToMany((type) => Role, (role) => role.user)
    // public roles: Role[];

    @OneToMany((type) => UserRole, (userRole) => userRole.user)
    public userRoles!: UserRole[];

    // public stores: Store[];
    @OneToMany(
        (type) => StoreAdministration,
        (storeAdministration) => storeAdministration.user,
    )
    public storeAdministrations!: StoreAdministration[];
}
