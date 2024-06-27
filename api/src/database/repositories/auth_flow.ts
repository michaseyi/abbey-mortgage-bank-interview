import db from '../db';
import models from '../models';
import { EntityManager } from 'typeorm';

type CreateAuthFlowParams = {
  email: string;
  token: number;
};

type WithTransaction = {
  tx?: EntityManager;
};

export async function createAuthFlow(
  params: CreateAuthFlowParams & WithTransaction,
) {
  const { email, token } = params;

  const authFlow = new models.AuthFlow(email, token);

  const manager = params.tx ? params.tx : db;

  await manager.getRepository(models.AuthFlow).save(authFlow);

  return authFlow;
}
