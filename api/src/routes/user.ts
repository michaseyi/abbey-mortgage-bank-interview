import Router from 'koa-router';
import controllers from '../controllers';

const userRoute = new Router({
  prefix: '/user',
});

userRoute.use(controllers.auth.protectedRoute);

userRoute.patch('/', controllers.user.updateUser);

userRoute.patch('/update-username', controllers.user.updateUsername);

// userRoute.put('/update-email', controllers.user.updateEmail);

export default userRoute;
