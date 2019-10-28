import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Role } from './Role';

@Entity({ name: 'UserRoles' })
export class UserRole {
    @Column({ primary: true, nullable: false })
    public userId: number;

    @Column({ primary: true, nullable: false })
    public roleId: number;

    @ManyToOne((type) => User, (user) => user.userRoles)
    @JoinColumn({ name: 'userId' })
    public user!: User;

    @ManyToOne((type) => Role, (role) => role.userRole)
    @JoinColumn({ name: 'roleId' })
    public role!: Role;
}
