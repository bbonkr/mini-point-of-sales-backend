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
import { Customer } from './Customer.model';
import { Payment } from './Payment.model';

@Table({
    modelName: 'CustomerPayment',
    tableName: 'CustomerPayments',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class CustomerPayment extends Model<CustomerPayment> {
    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => Customer)
    @Column(DataType.INTEGER)
    public customerId!: number;

    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => Payment)
    @Column(DataType.INTEGER)
    public paymentId!: number;
}
