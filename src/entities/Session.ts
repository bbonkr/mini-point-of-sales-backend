import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PrimaryEntityBase } from '../@typings/Entity/PrimaryEntityBase';

@Entity({ name: 'Sessions' })
export class Session extends PrimaryEntityBase {
    @Column({ length: 1000, nullable: false })
    public sid!: string;

    @Column({ type: 'text', nullable: false })
    public sess!: string;

    @Column({ nullable: false })
    public expire!: Date;
}
