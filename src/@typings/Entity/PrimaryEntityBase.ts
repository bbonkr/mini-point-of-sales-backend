import { EntityBase } from './EntityBase';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class PrimaryEntityBase extends EntityBase {
    @PrimaryGeneratedColumn('uuid')
    public id: string;
}
