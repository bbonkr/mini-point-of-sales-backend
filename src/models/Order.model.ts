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
    BelongsTo,
} from 'sequelize-typescript';
import { Store } from './Store.model';
import { OrderDetail } from './OrderDetail.model';
import { Payment } from './Payment.model';

@Table({
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class Order extends Model<Order> {
    @PrimaryKey
    @Comment('식별자')
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    public id!: number;

    @AllowNull(false)
    @Comment('주문 가격')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public amounts!: number;

    @AllowNull(false)
    @Comment('할인 금액')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public discount: number;

    @ForeignKey(() => Store)
    @Column(DataType.INTEGER)
    public storeId: number;

    @BelongsTo(() => Store)
    public store!: Store;

    @HasMany(() => OrderDetail)
    public orderDetails!: OrderDetail[];

    @HasMany(() => Payment)
    public payments!: Payment[];
}
