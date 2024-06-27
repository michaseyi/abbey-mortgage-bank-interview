import { DatabaseError } from '../../utils/error';
import db from '../db';
import models, { AuthFlow } from '../models';
import { EntityManager } from 'typeorm';

type CreateAuthFlowParams = {
  email: string;
  token: string;
};

export async function createAuthFlow(
  params: CreateAuthFlowParams,
  tx?: EntityManager,
) {
  const { email, token } = params;

  const authFlow = new models.AuthFlow(email, token);

  const manager = tx ? tx : db;

  try {
    await manager.getRepository(models.AuthFlow).save(authFlow);
  } catch (error) {
    throw new DatabaseError('Error creating auth flow');
  }

  return authFlow;
}

type FindAuthFlowByIdParams = Partial<AuthFlow>;

export async function findOne(
  params: FindAuthFlowByIdParams,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    const authFlow = await manager
      .getRepository(models.AuthFlow)
      .findOneBy({ ...params });
    return authFlow;
  } catch (error) {
    console.log(error);
    throw new DatabaseError('Error retrieving auth flow');
  }
}

export async function deleteAuthFlow(
  params: FindAuthFlowByIdParams,
  tx?: EntityManager,
) {
  const manager = tx ? tx : db;

  try {
    await manager.getRepository(models.AuthFlow).delete({ ...params });
  } catch (error) {
    throw new DatabaseError('Error deleting auth flow');
  }
}
