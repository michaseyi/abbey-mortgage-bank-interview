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

authRoute.get(
  '/signout',
  controllers.auth.protectedRoute,
  controllers.auth.signOut,
);

authRoute.get('/me', controllers.auth.protectedRoute, controllers.user.getUser);

authRoute.get(
  '/sessions',
  controllers.auth.protectedRoute,
  controllers.auth.getSessions,
);

authRoute.delete(
  '/sessions/:id',
  controllers.auth.protectedRoute,
  controllers.auth.deleteSession,
);

export default authRoute;
