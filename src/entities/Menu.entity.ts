import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Store, StoreValue } from './Store.entity';
import { PrimaryEntityBase, PrimaryEntity } from './PrimaryEntityBase';

export interface MenuValue extends PrimaryEntity {
  /** 메뉴 이름 */
  name: string;

  /** 가격 */
  price: number;

  /** 상품 이미지 url */
  image: string;
  /** 설명 */
  description?: string;
  /** 적립 포인트 */
  point: number;

  storeId?: string;

  store?: StoreValue;
}

@Entity({ name: 'Menus' })
export class Menu extends PrimaryEntityBase implements MenuValue {
  @Column({ length: 100, nullable: false, comment: '이름' })
  public name!: string;

  @Column({ default: 0, nullable: false, comment: '가격' })
  public price!: number;

  @Column({ nullable: true, comment: '상품 이미지 url' })
  public image!: string;

  @Column({ type: 'text', nullable: true, comment: '설명' })
  public description?: string;

  @Column({ default: 0, nullable: false, comment: '적립 포인트' })
  public point!: number;

  @Column()
  public storeId!: string;

  @ManyToOne(
    type => Store,
    store => store.menus
  )
  @JoinColumn({ name: 'storeId', referencedColumnName: 'id' })
  public store!: Store;
}
