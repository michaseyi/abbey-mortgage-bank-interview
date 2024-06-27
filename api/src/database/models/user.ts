import { Column, Entity, OneToMany } from 'typeorm';

import BaseEntity from './base_entity';
import { Session } from './session';
import { Thought } from './thought';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  username?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  profilePicture?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @OneToMany(() => Session, (session) => session.user)
  sessions?: Session[];

  @OneToMany(() => Thought, (thought) => thought.user)
  thoughts?: Thought[];

  constructor(email: string) {
    super();
    this.email = email;
  }
}
