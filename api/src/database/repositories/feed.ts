import { DatabaseError } from '../../utils/error';
import db from '../db';
import models, { Feed, Thought, User } from '../models';
import { EntityManager, FindOptionsWhere } from 'typeorm';

type CreateFeedParams = {
  userId: string;
  thoughtId: string;
};
export async function createFeed(params: CreateFeedParams, tx?: EntityManager) {
  const { userId, thoughtId } = params;

  const feed = new models.Feed(
    { id: userId } as User,
    { id: thoughtId } as Thought,
  );

  const manager = tx ? tx : db;

  try {
    return await manager.getRepository(models.Feed).save(feed);
  } catch (error) {
    throw new DatabaseError('Error creating feed');
  }
}

export async function deleteFeed(
  params: FindOptionsWhere<Feed>,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    await manager.getRepository(models.Feed).delete(params);
  } catch (error) {
    throw new DatabaseError('Error deleting feed');
  }
}

export async function findMany(
  params: FindOptionsWhere<Feed>,
  skip: number,
  take: number,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    const feeds = await manager
      .getRepository(models.Feed)
      .find({ where: params, skip, take, relations: ['thought'] });
    return feeds;
  } catch (error) {
    throw new DatabaseError('Error retrieving feeds');
  }
}

export async function findOne(params: Partial<Feed>, tx?: EntityManager) {
  const manager = tx ? tx : db;

  try {
    const feed = await manager
      .getRepository(models.Feed)
      .findOneBy({ ...params });
    return feed;
  } catch (error) {
    throw new DatabaseError('Error retrieving feed');
  }
}
