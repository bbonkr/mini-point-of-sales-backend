import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, AllowNull, Comment, Default, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { Store } from './Store.model';
import { Customer } from './customer.model';

@Table({
    modelName: 'StoreCustomer',
    tableName: 'StoreCustomers',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class StoreCustomer extends Model<StoreCustomer> {
    @AllowNull(false)
    @Comment('store.id')
    @ForeignKey(() => Store)
    @Column(DataType.INTEGER)
    public storeId!: number;

    @AllowNull(false)
    @Comment('customer.id')
    @ForeignKey(() => Customer)
    @Column(DataType.INTEGER)
    public customerId!: number;

    @AllowNull(false)
    @Comment('유효기간 - 시작')
    @Default(new Date())
    @Column(DataType.DATE)
    public validAt!: Date;

    @AllowNull(false)
    @Comment('유효기간 - 종료')
    @Default(new Date())
    @Column(DataType.DATE)
    public validUntil!: Date;
}