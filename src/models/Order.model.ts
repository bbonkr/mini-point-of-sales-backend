import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, AllowNull, Comment, Default, BelongsToMany } from 'sequelize-typescript';

@Table({
    modelName: 'Order',
    tableName: 'Orders',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class Order extends Model<Order> {

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
}