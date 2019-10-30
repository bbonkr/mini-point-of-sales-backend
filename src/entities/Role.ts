import {
    Entity,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
} from 'typeorm';
import { User } from './User';
import { PrimaryEntityBase } from '../@typings/Entity/PrimaryEntityBase';

@Entity({ name: 'Roles' })
export class Role extends PrimaryEntityBase {
    @Column({ length: 100, nullable: false, comment: '역할이름' })
    public name: string;

    @ManyToMany((type) => User, (user) => user.roles)
    public users: User[];
}
