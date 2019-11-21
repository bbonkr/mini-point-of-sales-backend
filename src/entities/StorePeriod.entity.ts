import { PrimaryEntityBase, PrimaryEntity } from './PrimaryEntityBase';
import { Store, StoreValue } from './Store.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export interface StorePeriodValue extends PrimaryEntity {
  /** 유효기간 시작 */

  start: Date;
  /** 유효기간 종료 */
  end: Date;

  storeId: string;

  store: StoreValue;
}

@Entity({ name: 'StorePeriods' })
export class StorePeriod extends PrimaryEntityBase implements StorePeriodValue {
  @Column({ nullable: false, comment: '유효기간 시작' })
  public start!: Date;
  @Column({ nullable: false, comment: '유효기간 종료' })
  public end!: Date;
  public storeId!: string;
  @ManyToOne(
    type => Store,
    store => store.periods
  )
  public store!: Store;
}
