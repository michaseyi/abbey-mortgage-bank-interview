import { DatabaseError } from '../../utils/error';
import db from '../../database/db';
import models, { Session, User } from '../models';
import { EntityManager, FindOptionsWhere, Not } from 'typeorm';

type CreateSessionParams = {
  userId: string;
};

export async function createSession(
  params: CreateSessionParams,
  tx?: EntityManager,
) {
  const { userId } = params;

  const session = new models.Session({ id: userId } as User);

  const manager = tx ? tx : db;

  try {
    await manager.getRepository(models.Session).save(session);
  } catch (error) {
    throw new DatabaseError('Error creating session');
  }

  return session;
}

type FindOneSessionParams = FindOptionsWhere<Session>;

export async function deleteSession(
  params: FindOneSessionParams,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    await manager.getRepository(models.Session).delete({ ...params });
  } catch (error) {
    throw new DatabaseError('Error deleting session');
  }
}

export async function findOne(
  params: FindOneSessionParams,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    const session = await manager
      .getRepository(models.Session)
      .findOne({ where: params, relations: ['user'] });
    return session;
  } catch (error) {
    throw new DatabaseError('Error retrieving session');
  }
}

export async function findMany(
  params: FindOptionsWhere<Session>,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    const sessions = await manager
      .getRepository(models.Session)
      .find({ where: params, skip, take });
    return sessions;
  } catch (error) {
    throw new DatabaseError('Error retrieving sessions');
  }
}
