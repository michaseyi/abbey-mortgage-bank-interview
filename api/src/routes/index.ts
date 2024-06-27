import authRoute from './auth';
import Router from 'koa-router';
import { HttpError } from 'koa';
import bodyParser from 'koa-bodyparser';

const routes = new Router({
  prefix: '/api/v1',
});

routes.use(bodyParser());

routes.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof HttpError) {
      ctx.status = err.status;
      ctx.body = {
        message: err.message,
      };
      return;
    } else {
      ctx.status = 500;
      ctx.body = {
        message: 'Internal Server Error',
      };
      return;
    }
  }
});

routes.use(authRoute.routes());

export default routes;
