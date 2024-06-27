import { DatabaseError } from '../../utils/error';
import db from '../../database/db';
import models, { Session, User } from '../models';
import { EntityManager } from 'typeorm';

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

type FindOneSessionParams = Partial<Session>;

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
      .findOneBy({ ...params });
    return session;
  } catch (error) {
    throw new DatabaseError('Error retrieving session');
  }
}
