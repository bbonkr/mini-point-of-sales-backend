import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, DataType, AllowNull, Comment, Default, BelongsToMany } from 'sequelize-typescript';
import { Store } from './Store.model';
import { StoreAdministration } from './StoreAdministration.model';

@Table({
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export class User extends Model<User> {
    
    @AllowNull(false)
    @Comment('계정이름 - 로그인에 사용')
    @Column(DataType.STRING(100))
    public username!: string;
    
    
    @AllowNull(false)
    @Comment('표시 이름')
    @Column(DataType.STRING(100))
    public displayName!: string;
    
    
    @AllowNull(false)
    @Comment('전자우편주소')
    @Column(DataType.STRING(100))
    public email!: string;
    
    
    @AllowNull(false)
    @Comment('비밀번호 - 해시됨')
    @Column(DataType.STRING(500))
    public password!: string;
    
    
    @AllowNull(false)
    @Default(false)
    @Comment('전자우편주소 확인 여부')
    @Column(DataType.BOOLEAN)
    public isEmailConfirmed!: boolean;
    
    
    @AllowNull(true)
    @Comment('이미지 URL')
    @Column(DataType.STRING(500))
    public photo!: string;

    @BelongsToMany(() => Store, () => StoreAdministration)
    public stores: Store[];
};