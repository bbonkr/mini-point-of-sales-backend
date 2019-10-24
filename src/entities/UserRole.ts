import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Role } from './Role';

@Entity({ name: 'UserRoles' })
export class UserRole {
    @PrimaryGeneratedColumn()
    public userRoleId: number;
    @Column()
    public userId: number;
    @Column()
    public roleId: number;

    @ManyToOne((type) => User, (user) => user.userRoles)
    public user!: User;
    @ManyToOne((type) => Role, (role) => role.userRole)
    public role!: Role;
}
