import {
    Table,
    Column,
    Model,
    HasMany,
    PrimaryKey,
    AutoIncrement,
    DataType,
    AllowNull,
    Comment,
    Default,
    BelongsToMany,
} from 'sequelize-typescript';
import { User } from './User.model';
import { UserRole } from './UserRole.model';

@Table({
    modelName: 'Role',
    tableName: 'Roles',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class Role extends Model<Role> {
    @AllowNull(false)
    @Comment('역할이름')
    @Column(DataType.STRING(100))
    public name!: string;

    @BelongsToMany(() => User, () => UserRole)
    public users: User[];
}
