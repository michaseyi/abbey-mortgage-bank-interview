import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

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

  @OneToMany(() => UserFollowers, (userFollowers) => userFollowers.user)
  following?: UserFollowers[];

  @OneToMany(() => UserFollowers, (userFollowers) => userFollowers.following)
  followers?: UserFollowers[];

  constructor(email: string) {
    super();
    this.email = email;
  }
}

@Entity('user_following_user')
export class UserFollowers extends BaseEntity {
  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'following_id' })
  following!: User;
}
