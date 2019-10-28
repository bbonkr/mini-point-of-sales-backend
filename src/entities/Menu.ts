import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Store } from './Store';

@Entity({ name: 'Menus' })
export class Menu {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column({ length: 100, nullable: false, comment: '이름' })
    public name: string;
    @Column({ default: 0, nullable: false, comment: '가격' })
    public price: number;
    @Column({ comment: '상품 이미지 url' })
    public image: string;
    @Column({ type: 'text', comment: '설명' })
    public description?: string;
    @Column({ default: 0, nullable: false, comment: '적립 포인트' })
    public point: number;
    @Column()
    public storeId: number;
    @ManyToOne((type) => Store, (store) => store.menus)
    @JoinColumn({ name: 'storeId' })
    public store: Store;
}
