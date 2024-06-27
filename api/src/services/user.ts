import { ConflictError } from '../utils/error';
import repositories from '../database/repositories';
import { EntityManager } from 'typeorm';
import { User } from '../database/models';

export async function createUser(email: string, tx?: EntityManager) {
  const exisitingUser = await repositories.user.findOne({ email }, tx);

  if (exisitingUser !== null) {
    throw new ConflictError('User with same email already exists');
  }

  const user = await repositories.user.createUser({ email });
  return user;
}

export async function findUser(
  id?: string,
  email?: string,
  tx?: EntityManager,
) {
  const user = await repositories.user.findOne({ id, email }, tx);
  return user;
}

export async function updateUser(
  id: string,
  updates: Partial<User>,
  tx?: EntityManager,
) {
  await repositories.user.updateUser({ id, updates }, tx);
}

export async function updateUsername(
  id: string,
  username: string,
  tx?: EntityManager,
) {
  if ((await repositories.user.findOne({ username }, tx)) !== null) {
    throw new ConflictError('Username taken');
  }

  await repositories.user.updateUser({ id, updates: { username } }, tx);
}

export async function updateEmail(id: string, email: string) {
  if (findUser(undefined, email) !== null) {
    throw new ConflictError('Email already exists');
  }

  // create new auth flow
}
