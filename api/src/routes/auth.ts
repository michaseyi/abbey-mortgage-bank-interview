import Router from 'koa-router';
import controllers from '../controllers';

const authRoute = new Router({
  prefix: '/auth',
});

authRoute.post(
  '/start-email-signin-flow',
  controllers.auth.startEmailSignInFlow,
);

authRoute.post(
  '/verify-email-signin-flow',
  controllers.auth.verifyEmailSignInFlow,
);

export default authRoute;
