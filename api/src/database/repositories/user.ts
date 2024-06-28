import { DatabaseError } from '../../utils/error';
import db from '../db';
import models, { User, UserFollowers } from '../models';
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

export async function followUser(
  userId: string,
  followId: string,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  const userFollower = new UserFollowers(
    { id: userId } as User,
    { id: followId } as User,
  );
  try {
    await manager.getRepository(models.UserFollowers).save(userFollower);
  } catch (error) {
    throw new DatabaseError('Error following user');
  }
}

export async function unfollowUser(
  userId: string,
  followId: string,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    await manager
      .getRepository(models.UserFollowers)
      .delete({ user: { id: userId }, following: { id: followId } });
  } catch (error) {
    throw new DatabaseError('Error unfollowing user');
  }
}

export async function findMany(
  params: FindOneUserParam,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    const users = await manager
      .getRepository(models.User)
      .find({ where: params, skip, take });
    return users;
  } catch (error) {
    throw new DatabaseError('Error retrieving users');
  }
}

export async function getFollowing(
  id: number,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  
}
