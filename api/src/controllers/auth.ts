import { Middleware } from 'koa';
import services from '../services';

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
    ctx.throw(400);
  }
};

type StateWithUser = {
  user: {
    id: string;
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

  const jwtToken = authorizationTokenSplit[1];

  ctx.state.user = {
    id: 'id',
  };

  next();
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

  ctx.body = {
    token: 'jwt',
  };
};
