import { PrimaryEntityBase } from '../@typings/Entity/PrimaryEntityBase';
import { IStorePeriod } from '../@typings/Entity/Entities';
import { Store } from './Store';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'StorePeriods' })
export class StorePeriod extends PrimaryEntityBase implements IStorePeriod {
    @Column({ nullable: false, comment: '유효기간 시작' })
    public start: Date;
    @Column({ nullable: false, comment: '유효기간 종료' })
    public end: Date;
    public storeId: string;
    @ManyToOne((type) => Store, (store) => store.periods)
    public store: Store;
}
