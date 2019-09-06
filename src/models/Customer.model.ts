import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, AllowNull, Comment, Default, BelongsToMany } from 'sequelize-typescript';
import { Store } from './Store.model';
import { StoreCustomer } from './StoreCustomer.model';

@Table({
    modelName: 'Customer',
    tableName: 'Customers',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class Customer extends Model<Customer> {

    @AllowNull(false)
    @Comment('휴대전화번호')
    @Column(DataType.STRING(20))
    public mobile!: string;

    @AllowNull(true)
    @Comment('이름')
    @Column(DataType.STRING(50))
    public name?: string;

    @BelongsToMany(() => Store, () => StoreCustomer)
    public stores!: Store[];
}