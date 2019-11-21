import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class EntityBase {
  @Column()
  @CreateDateColumn()
  public createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
