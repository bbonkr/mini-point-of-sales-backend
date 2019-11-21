import { EntityBase } from './EntityBase';
import { PrimaryGeneratedColumn } from 'typeorm';

export interface PrimaryEntity {
  id: string;
}

export abstract class PrimaryEntityBase extends EntityBase
  implements PrimaryEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;
}
