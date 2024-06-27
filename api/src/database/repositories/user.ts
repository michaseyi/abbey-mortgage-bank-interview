import { DatabaseError } from '../../utils/error';
import db from '../db';
import models, { User } from '../models';
import { EntityManager } from 'typeorm';

type CreateUserParams = {
  email: string;
};

export async function createUser(params: CreateUserParams, tx?: EntityManager) {
  const { email } = params;
  const user = new models.User(email);

  const manager = tx ? tx : db;

  try {
    await manager.getRepository(models.User).save(user);
  } catch (error) {
    throw new DatabaseError('Error creating user');
  }

  return user;
}

type FindOneUserParam = Partial<User>;

export async function findOne(params: FindOneUserParam, tx?: EntityManager) {
  const manager = tx ? tx : db;

  try {
    const user = await manager
      .getRepository(models.User)
      .findOneBy({ ...params });
    return user;
  } catch (error) {
    throw new DatabaseError('Error retrieving user');
  }
}

type UpdateUserParams = {
  id: string;
  updates: Partial<User>;
};
export async function updateUser(param: UpdateUserParams, tx?: EntityManager) {
  const { id, updates } = param;
  const manager = tx ? tx : db;

  try {
    await manager.getRepository(models.User).update({ id }, updates);
  } catch (error) {
    throw new DatabaseError('Error updating user');
  }
}
