import { Middleware } from 'koa';
import services from '../services';
import repositories from '../database/repositories';

type SignInWithEmailBody = {
  email: string;
};

function validateSignInWithEmailBody(value: any): value is SignInWithEmailBody {
  if (typeof value !== 'object') {
    return false;
  }

  if (typeof value.email !== 'string') {
    return false;
  }

  return true;
}

export const startEmailSignInFlow: Middleware = async (ctx) => {
  if (!validateSignInWithEmailBody(ctx.request.body)) {
    ctx.throw(400);

    return;
  }
  const { email } = ctx.request.body;

  try {
    const flowId = await services.auth.startEmailSignInFlow(email);

    ctx.status = 201;
    ctx.body = {
      flowId,
    };
  } catch (error) {
    ctx.throw(500);
  }
};

export type StateWithUser = {
  user: {
    id: string;
    sessionId: string;
  };
};

export const protectedRoute: Middleware<StateWithUser> = async (ctx, next) => {
  const authorizationToken = ctx.request.headers['authorization'];

  if (!authorizationToken) {
    ctx.throw(401);

    return;
  }

  const authorizationTokenSplit = authorizationToken.split(' ');

  if (authorizationTokenSplit.length !== 2) {
    ctx.throw(401);

    return;
  }

  const sessionToken = authorizationTokenSplit[1];

  ctx.state.user = {
    sessionId: sessionToken,
    id: await services.auth.getUserFromSessionToken(sessionToken),
  };

  await next();
};

export const signOut: Middleware<StateWithUser> = async (ctx) => {
  const sessionId = ctx.state.user.sessionId;

  await repositories.session.deleteSession({ id: sessionId });

  ctx.status = 200;
  ctx.body = {
    message: 'Signed out',
  };
};

type VerifyEmailBody = {
  flowId: string;
  token: string;
};

function validateVerifyEmailBody(value: any): value is VerifyEmailBody {
  if (typeof value !== 'object') {
    return false;
  }

  if (typeof value.flowId !== 'string') {
    return false;
  }

  if (typeof value.token !== 'string') {
    return false;
  }

  return true;
}

export const verifyEmailSignInFlow: Middleware<StateWithUser> = async (ctx) => {
  if (!validateVerifyEmailBody(ctx.request.body)) {
    ctx.throw(400);

    return;
  }

  const { flowId, token } = ctx.request.body;

  const sessionToken = await services.auth.verifyEmailSignInFlow(flowId, token);

  ctx.body = {
    sessionToken,
  };
};

export const getSessions: Middleware<StateWithUser> = async (ctx) => {
  const { id } = ctx.state.user;

  const start =
    ctx.query.start && !(ctx.query.start instanceof Array)
      ? parseInt(ctx.query.start)
      : 0;

  const limit =
    ctx.query.limit && !(ctx.query.limit instanceof Array)
      ? parseInt(ctx.query.limit)
      : 10;

  const sessions = await repositories.session.findMany(
    { user: { id } },
    start,
    limit,
  );

  ctx.body = {
    sessions,
  };
};

export const deleteSession: Middleware<StateWithUser> = async (ctx) => {
  const { id } = ctx.state.user;

  const sessionId = ctx.params.id;

  await repositories.session.deleteSession({ user: { id }, id: sessionId });

  ctx.status = 200;
  ctx.body = {
    message: 'Session deleted',
  };
};
