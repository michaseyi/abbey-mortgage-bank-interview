import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';

import BaseEntity from './base_entity';
import { Session } from './session';
import { Thought } from './thought';
import { Feed } from './feed';

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

  @OneToMany(() => Feed, (feed) => feed.user)
  feeds?: Feed[];

  @OneToMany(() => UserFollowers, (userFollowers) => userFollowers.follower)
  following?: UserFollowers[];

  @OneToMany(() => UserFollowers, (userFollowers) => userFollowers.following)
  followers?: UserFollowers[];

  constructor(email: string) {
    super();
    this.email = email;
  }
}

@Entity('follower_following')
@Unique(['follower', 'following'])
export class UserFollowers extends BaseEntity {
  @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'follower_id' })
  follower!: User;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'following_id' })
  following!: User;

  constructor(user: User, following: User) {
    super();
    this.follower = user;
    this.following = following;
  }
}
