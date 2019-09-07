import {
    Table,
    Column,
    Model,
    Comment,
    HasMany,
    PrimaryKey,
    AutoIncrement,
    DataType,
    AllowNull,
    BelongsToMany,
    Default,
} from 'sequelize-typescript';
import { User } from './User.model';
import { StoreAdministration } from './StoreAdministration.model';
import { Customer } from './Customer.model';
import { StoreCustomer } from './StoreCustomer.model';
import { Menu } from './Menu.model';
import { Order } from './Order.model';
import { OrderDetail } from './OrderDetail.model';
import { Payment } from './Payment.model';
import { BusinessTypes } from '../@typings/enums/BusinessTypes';

@Table({
    modelName: 'Store',
    tableName: 'Stores',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class Store extends Model<Store> {
    @PrimaryKey
    @Comment('식별자')
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    public id!: number;

    @Comment('매장 이름')
    @AllowNull(false)
    @Column(DataType.STRING(100))
    public name!: string;

    @Comment('업종')
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    public businessType!: BusinessTypes;

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

    @BelongsToMany(() => User, () => StoreAdministration)
    public users!: User[];

    @BelongsToMany(() => Customer, () => StoreCustomer)
    public customers!: Customer[];

    @HasMany(() => Menu)
    public menus!: Menu[];

    @HasMany(() => Order)
    public orders!: Order[];

    @HasMany(() => OrderDetail)
    public orderDetails!: OrderDetail[];

    @HasMany(() => Payment)
    public payments!: Payment[];
}
