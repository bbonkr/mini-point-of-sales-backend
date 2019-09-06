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
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { Store } from './Store.model';

@Table({
    modelName: 'Menu',
    tableName: 'Menus',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class Menu extends Model<Menu> {
    @PrimaryKey
    @Comment('식별자')
    @AllowNull(false)
    @AutoIncrement
    @Column(DataType.INTEGER)
    public id!: number;

    @AllowNull(false)
    @Comment('이름')
    @Column(DataType.STRING(100))
    public name!: string;

    @AllowNull(false)
    @Comment('가격')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public price!: number;

    @AllowNull(true)
    @Comment('상품 이미지 URL')
    @Column(DataType.STRING(500))
    public image?: string;

    @AllowNull(true)
    @Comment('설명')
    @Column(DataType.TEXT)
    public description?: string;

    @AllowNull(false)
    @Comment('적립 포인트')
    @Default(0)
    @Column(DataType.INTEGER.UNSIGNED)
    public point!: number;

    @ForeignKey(() => Store)
    @Column(DataType.INTEGER)
    public storeId: number;

    @BelongsTo(() => Store)
    public store: Store;
}
