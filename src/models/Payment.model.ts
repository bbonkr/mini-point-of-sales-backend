import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, AllowNull, Comment, Default, BelongsToMany } from 'sequelize-typescript';
import { PaymentMethod } from '../@typings/enums/paymentMethod';

@Table({
    modelName: 'Payment',
    tableName: 'Payments',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class Payment extends Model<Payment> {

    @AllowNull(false)
    @Comment('주문 금액')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public orderAmounts!: number;

    @AllowNull(false)
    @Comment('사용 포인트')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public point!: number;

    @AllowNull(false)
    @Comment('결재 금액')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public amount!: number;

    @AllowNull(false)
    @Comment('공급가액')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public value!: number;

    @AllowNull(false)
    @Comment('부가세')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public tax!: number;

    @AllowNull(false)
    @Comment('결재 방법')
    @Default(PaymentMethod.CASH)
    @Column(DataType.INTEGER.UNSIGNED)
    public payMethod!: PaymentMethod;

    @AllowNull(false)
    @Comment('할부 개월')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public installment!: number; 

    @AllowNull(false)
    @Comment('취소 여부')
    @Default(false)
    @Column(DataType.BOOLEAN)
    public isCancelled!: boolean;
}