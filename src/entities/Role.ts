import {
    Entity,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { User } from './User';
import { UserRole } from './UserRole';

@Entity({ name: 'Roles' })
export class Role {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ length: 100, comment: '역할이름' })
    public name: string;
    // @ManyToOne((type) => User, (user) => user.roles)
    // public user: User[];
    @OneToMany((type) => UserRole, (userRole) => userRole.role)
    public userRole!: UserRole[];
}
