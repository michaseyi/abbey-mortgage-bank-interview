import Router from 'koa-router';
import controllers from '../controllers';

const userRoute = new Router({
  prefix: '/user',
});

userRoute.use(controllers.auth.protectedRoute);

userRoute.patch('/', controllers.user.updateUser);

userRoute.patch('/update-username', controllers.user.updateUsername);

// userRoute.put('/update-email', controllers.user.updateEmail);

userRoute.post('/thoughts', controllers.user.createThought);

userRoute.delete('/thoughts/:id', controllers.user.deleteThought);

userRoute.get('/thoughts', controllers.user.getThoughts);

userRoute.get('/follow/:id', controllers.user.followUser);

userRoute.get('/unfollow/:id', controllers.user.unfollowUser);

userRoute.get('/followers', controllers.user.getFollowers);

userRoute.get('/followings', controllers.user.getFollowing);

userRoute.get('/feeds', controllers.user.getFeeds);

userRoute.delete('/feeds/:id', controllers.user.deleteFeed);

userRoute.get('/search', controllers.user.searchUsers);
export default userRoute;
