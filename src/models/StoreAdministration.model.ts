import {
    Model,
    Table,
    Column,
    ForeignKey,
    DataType,
    AllowNull,
    Comment,
    Default,
    PrimaryKey,
} from 'sequelize-typescript';
import { User } from './User.model';
import { Store } from './Store.model';

@Table({
    modelName: 'StoreAdministration',
    tableName: 'StoreAdministrations',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class StoreAdministration extends Model<StoreAdministration> {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => Store)
    @Column(DataType.INTEGER)
    public storeId!: number;

    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER.UNSIGNED)
    public userId!: number;
}
