import { Middleware } from 'koa';
import { StateWithUser } from './auth';
import { findUser } from '../services/user';
import { User } from '../database/models';
import services from '../services';

export const getUser: Middleware<StateWithUser> = async (ctx) => {
  const user = await findUser(ctx.state.user.id);

  if (user === null) {
    ctx.throw(404);
    return;
  }

  ctx.status = 200;
  ctx.body = {
    firstname: user.firstname ?? '',
    lastname: user.lastname ?? '',
    profilePicture: user.profilePicture ?? '',
    id: user.id,
    username: user.username ?? ' ',
    email: user.email,
    bio: user.bio ?? '',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

function validateUpdateUserBody(value: any): value is Partial<User> {
  if (typeof value !== 'object') {
    return false;
  }

  if (value.firstname !== undefined && typeof value.firstname !== 'string') {
    return false;
  }

  if (value.lastname !== undefined && typeof value.lastname !== 'string') {
    return false;
  }

  if (value.bio !== undefined && typeof value.bio !== 'string') {
    return false;
  }
  return true;
}

export const updateUser: Middleware<StateWithUser> = async (ctx) => {
  if (!validateUpdateUserBody(ctx.request.body)) {
    ctx.throw(400);
    return;
  }
  const userData = ctx.request.body;

  const userUpdates = {
    firstname: userData.firstname ?? undefined,
    lastname: userData.lastname ?? undefined,
    bio: userData.bio ?? undefined,
  };

  await services.user.updateUser(ctx.state.user.id, userUpdates);

  ctx.status = 200;
  ctx.body = {
    message: 'User updated',
  };
};

function validateUpdateUsernameBody(value: any): value is { username: string } {
  if (typeof value !== 'object') {
    return false;
  }

  if (typeof value.username !== 'string') {
    return false;
  }

  return true;
}

export const updateUsername: Middleware<StateWithUser> = async (ctx) => {
  if (!validateUpdateUsernameBody(ctx.request.body)) {
    ctx.throw(400);
    return;
  }

  const { username } = ctx.request.body;

  await services.user.updateUsername(ctx.state.user.id, username);

  ctx.status = 200;
  ctx.body = {
    message: 'Username updated',
  };
};

type CreateThoughtBody = {
  content: string;
};

function validateCreateThoughtBody(value: any): value is CreateThoughtBody {
  if (typeof value !== 'object') {
    return false;
  }

  if (typeof value.content !== 'string') {
    return false;
  }

  return true;
}

export const createThought: Middleware<StateWithUser> = async (ctx) => {
  if (!validateCreateThoughtBody(ctx.request.body)) {
    ctx.throw(400);
    return;
  }
  const { content } = ctx.request.body;

  const thought = await services.user.createThought(ctx.state.user.id, content);

  ctx.status = 200;
  ctx.body = {
    thought,
  };
};

export const deleteThought: Middleware<StateWithUser> = async (ctx) => {
  const { id } = ctx.params;

  await services.user.deleteThought(id, ctx.state.user.id);

  ctx.status = 200;
  ctx.body = {
    message: 'Thought deleted',
  };
};

export const getThoughts: Middleware<StateWithUser> = async (ctx) => {
  const id =
    ctx.query.userId && !(ctx.query.userId instanceof Array)
      ? ctx.query.userId
      : ctx.state.user.id;
  const start =
    ctx.query.start && !(ctx.query.start instanceof Array)
      ? parseInt(ctx.query.start)
      : 0;

  const limit =
    ctx.query.limit && !(ctx.query.limit instanceof Array)
      ? parseInt(ctx.query.limit)
      : 10;

  const thoughts = await services.user.getThoughts(id, start, limit);

  ctx.body = {
    thoughts,
  };
};

export const followUser: Middleware<StateWithUser> = async (ctx) => {
  const { id } = ctx.params;

  await services.user.followUser(ctx.state.user.id, id);

  ctx.body = {
    message: 'User followed',
  };
};
