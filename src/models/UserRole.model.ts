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
    ForeignKey,
} from 'sequelize-typescript';
import { User } from './User.model';
import { Role } from './Role.model';

@Table({
    modelName: 'UserRole',
    tableName: 'UserRoles',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class UserRole extends Model<UserRole> {
    @PrimaryKey
    @ForeignKey(() => User)
    @AllowNull(false)
    @Comment('user.id')
    @Column(DataType.INTEGER)
    public userId!: number;

    @PrimaryKey
    @ForeignKey(() => Role)
    @AllowNull(false)
    @Comment('role.id')
    @Column(DataType.INTEGER)
    public roleId!: number;
}
