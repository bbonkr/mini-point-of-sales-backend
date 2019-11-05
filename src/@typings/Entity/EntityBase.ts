import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IEntityBase {
    createdAt: Date;
    updatedAt: Date;
}

export abstract class EntityBase implements IEntityBase {
    @Column()
    @CreateDateColumn()
    public createdAt!: Date;

    @Column()
    @UpdateDateColumn()
    public updatedAt!: Date;
}
