import { Column, Entity } from 'typeorm';
import BaseEntity from './base_entity';

@Entity()
export class AuthFlow extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 6 })
  token: string;

  constructor(email: string, token: string) {
    super();
    this.email = email;
    this.token = token;
  }
}
