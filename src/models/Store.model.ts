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
    BelongsToMany
} from 'sequelize-typescript';
import { User } from './User.model';
import { StoreAdministration } from './StoreAdministration.model';

@Table({
    modelName: 'Store',
    tableName: 'Stores',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class Store extends Model<Store> {
    
    @Comment('매장 이름')
    @AllowNull(false)
    @Column(DataType.STRING(100))
    public name!: string;

    
    @Comment('업종')
    @AllowNull(false)
    @Column(DataType.INTEGER.UNSIGNED)
    public businessType!: number;

    @BelongsToMany(()=> User, () => StoreAdministration)
    public users: User[];
};