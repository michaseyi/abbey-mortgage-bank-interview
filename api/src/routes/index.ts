import authRoute from './auth';
import userRoute from './user';
import Router from 'koa-router';
import { HttpError } from 'koa';
import bodyParser from 'koa-bodyparser';
import {
  ConflictError,
  DatabaseError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/error';

const routes = new Router({
  prefix: '/api/v1',
});

routes.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    let status: number;
    let message: string;
    if (err instanceof HttpError) {
      status = err.status;
      message = err.message;
    } else if (err instanceof NotFoundError) {
      status = 404;
      message = err.message;
    } else if (err instanceof DatabaseError) {
      status = 500;
      message = err.message;
    } else if (err instanceof UnauthorizedError) {
      status = 401;
      message = err.message;
    } else if (err instanceof ConflictError) {
      status = 409;
      message = err.message;
    } else {
      status = 500;
      message = 'Internal Server Error';
    }

    ctx.status = status;
    ctx.body = {
      message,
    };
  }
});

routes.get('/status', async (ctx) => {
  ctx.body = {
    status: 'ok',
  };
});

routes.use(bodyParser());

routes.use(authRoute.routes());
routes.use(userRoute.routes());

export default routes;
