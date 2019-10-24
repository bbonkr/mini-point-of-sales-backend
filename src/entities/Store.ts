import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BusinessTypes } from '../@typings/enums/BusinessTypes';
import { StoreAdministration } from './StoreAdministration';

@Entity({ name: 'Stores' })
export class Store {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 100 })
    public name!: string;

    @Column({
        type: 'enum',
        enum: BusinessTypes,
        default: BusinessTypes.COFFEE,
    })
    public businessType!: BusinessTypes;

    @Column({ default: new Date(), comment: '유효기간 시작' })
    public validAt!: Date;

    @Column({ default: new Date(), comment: '유효기간 종료' })
    public validUntil!: Date;

    @OneToMany(
        (type) => StoreAdministration,
        (storeAdministration) => storeAdministration.store,
    )
    public storeAdministrations!: StoreAdministration[];
}
