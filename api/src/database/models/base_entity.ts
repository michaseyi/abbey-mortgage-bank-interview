import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { randomUUID } from 'crypto';

export default class BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor() {
    this.id = randomUUID();
  }
}
