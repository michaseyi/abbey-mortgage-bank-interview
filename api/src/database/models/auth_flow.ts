import { Column, Entity } from 'typeorm';
import BaseEntity from './base_entity';

@Entity()
export class AuthFlow extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'integer' })
  token: number;

  constructor(email: string, token: number) {
    super();
    this.email = email;
    this.token = token;
  }
}
