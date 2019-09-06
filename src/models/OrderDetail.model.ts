import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, AllowNull, Comment, Default, BelongsToMany } from 'sequelize-typescript';

@Table({
    modelName: 'OrderDetail',
    tableName: 'OrderDetails',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class OrderDetail extends Model<OrderDetail> {

    @AllowNull(false)
    @Comment('메뉴 이름')
    @Column(DataType.STRING(100))
    public name!: string;

    @AllowNull(false)
    @Comment('메뉴 단품 가격')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public price!: number;

    @AllowNull(false)
    @Comment('수량')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public quantity!: number;

    @AllowNull(false)
    @Comment('할인')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public discount!: number;

    @AllowNull(false)
    @Comment('포장여부')
    @Default(false)
    @Column(DataType.BOOLEAN)
    public takeout!: boolean;
}