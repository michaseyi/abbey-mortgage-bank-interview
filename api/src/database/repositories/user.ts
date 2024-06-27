import db from '../db';
import models from '../models';
import { EntityManager } from 'typeorm';

type CreateUserParams = {
  email: string;
};

type WithTransaction = {
  tx?: EntityManager;
};

export async function createUser(params: CreateUserParams & WithTransaction) {
  const { email } = params;
  const user = new models.User(email);

  const manager = params.tx ? params.tx : db;

  await manager.getRepository(models.User).save(user);

  return user;
}
