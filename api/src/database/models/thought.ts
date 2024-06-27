import { Column, Entity, ManyToOne } from 'typeorm';
import BaseEntity from './base_entity';
import { User } from './user';

@Entity()
export class Thought extends BaseEntity {
  @ManyToOne(() => User, (user) => user.thoughts, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @Column({ type: 'text', nullable: false })
  content: string;

  constructor(user: User, content: string) {
    super();
    this.user = user;
    this.content = content;
  }
}
