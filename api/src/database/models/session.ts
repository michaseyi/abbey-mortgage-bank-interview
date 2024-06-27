import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './base_entity';
import { User } from './user';

@Entity()
export class Session extends BaseEntity {
  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  constructor(user: User) {
    super();
    this.user = user;
  }
}
