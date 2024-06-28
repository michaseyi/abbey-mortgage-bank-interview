import { Entity, ManyToOne, Unique } from 'typeorm';
import BaseEntity from './base_entity';
import { User } from './user';
import { Thought } from './thought';

@Entity()
@Unique(['user', 'thought'])
export class Feed extends BaseEntity {
  @ManyToOne(() => User, (user) => user.feeds, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Thought, { onDelete: 'CASCADE' })
  thought: Thought;
  
  constructor(user: User, thought: Thought) {
    super();
    this.user = user;
    this.thought = thought;
  }
}
