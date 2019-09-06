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
import { Store } from './Store.model';
import { Customer } from './Customer.model';

@Table({
    modelName: 'StoreCustomer',
    tableName: 'StoreCustomers',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class StoreCustomer extends Model<StoreCustomer> {
    @PrimaryKey
    @ForeignKey(() => Store)
    @Column(DataType.INTEGER)
    public storeId!: number;

    @PrimaryKey
    @ForeignKey(() => Customer)
    @Column(DataType.INTEGER)
    public customerId!: number;
}
