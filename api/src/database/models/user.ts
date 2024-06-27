import { Column, Entity, OneToMany } from 'typeorm';

import BaseEntity from './base_entity';
import { Session } from './session';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 255 })
  email: string;

  @OneToMany(() => Session, (session) => session.user)
  sessions?: Session[];

  constructor(email: string) {
    super();
    this.email = email;
  }
}
