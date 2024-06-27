import { DatabaseError } from '../../utils/error';
import db from '../db';
import models, { Thought, User } from '../models';
import { EntityManager, FindOptionsWhere, Like } from 'typeorm';

type CreateThoughtParams = {
  userId: string;
  content: string;
};

export async function createThought(
  param: CreateThoughtParams,
  tx?: EntityManager,
) {
  const { userId, content } = param;

  const thought = new models.Thought({ id: userId } as User, content);

  const manager = tx ? tx : db;

  try {
    await manager.getRepository(models.Thought).save(thought);
  } catch (error) {
    throw new Error('Error creating thought');
  }

  return thought;
}

export async function deleteThought(
  params: FindOptionsWhere<Thought>,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    await manager.getRepository(models.Thought).delete({ ...params });
  } catch (error) {
    throw new DatabaseError('Error deleting thought');
  }
}

export async function findOne(params: Partial<Thought>, tx?: EntityManager) {
  const manager = tx ? tx : db;

  try {
    const thought = await manager
      .getRepository(models.Thought)
      .findOneBy({ ...params });
    return thought;
  } catch (error) {
    throw new DatabaseError('Error retrieving thought');
  }
}

export async function findMany(
  params: FindOptionsWhere<Thought>,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    const thoughts = await manager
      .getRepository(models.Thought)
      .find({ where: params, take, skip });
    return thoughts;
  } catch (error) {
    throw new DatabaseError('Error retrieving thoughts');
  }
}
