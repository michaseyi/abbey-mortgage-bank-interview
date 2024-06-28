import { ConflictError, NotFoundError } from '../utils/error';
import repositories from '../database/repositories';
import { EntityManager, Not } from 'typeorm';
import { User } from '../database/models';
import db from 'database/db';

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

export async function updateEmail(
  id: string,
  email: string,
  tx?: EntityManager,
) {
  if (findUser(undefined, email) !== null) {
    throw new ConflictError('Email already exists');
  }

  // create new auth flow
}

export async function createThought(
  userId: string,
  content: string,
  tx?: EntityManager,
) {
  const thought = await repositories.thought.createThought(
    { userId, content },
    tx,
  );
  return thought;
}

export async function deleteThought(
  id: string,
  userId: string,
  tx?: EntityManager,
) {
  await repositories.thought.deleteThought({ user: { id: userId }, id }, tx);
}

export async function getThoughts(
  userId: string,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  const thoughts = await repositories.thought.findMany(
    { user: { id: userId } },
    skip,
    take,
    tx,
  );
  return thoughts;
}

export async function followUser(
  userId: string,
  followId: string,
  tx?: EntityManager,
) {
  if (userId === followId) {
    throw new ConflictError('Cannot follow self');
  }
  const follow = await repositories.user.findOne({ id: followId }, tx);

  if (follow === null) {
    throw new NotFoundError('User to be followed not found');
  }

  await repositories.user.followUser(userId, followId, tx);
}
