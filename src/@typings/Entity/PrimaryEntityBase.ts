import { EntityBase, IEntityBase } from './EntityBase';
import { PrimaryGeneratedColumn } from 'typeorm';

export interface IPrimaryEntityBase extends IEntityBase {
    id: string;
}

export abstract class PrimaryEntityBase extends EntityBase
    implements IPrimaryEntityBase {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
}
