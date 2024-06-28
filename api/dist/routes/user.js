"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const controllers_1 = __importDefault(require("../controllers"));
const userRoute = new koa_router_1.default({
    prefix: '/user',
});
userRoute.use(controllers_1.default.auth.protectedRoute);
userRoute.patch('/', controllers_1.default.user.updateUser);
userRoute.patch('/update-username', controllers_1.default.user.updateUsername);
// userRoute.put('/update-email', controllers.user.updateEmail);
userRoute.post('/thoughts', controllers_1.default.user.createThought);
userRoute.delete('/thoughts/:id', controllers_1.default.user.deleteThought);
userRoute.get('/thoughts', controllers_1.default.user.getThoughts);
userRoute.get('/follow/:id', controllers_1.default.user.followUser);
userRoute.get('/unfollow/:id', controllers_1.default.user.unfollowUser);
userRoute.get('/followers', controllers_1.default.user.getFollowers);
userRoute.get('/followings', controllers_1.default.user.getFollowing);
userRoute.get('/feeds', controllers_1.default.user.getFeeds);
userRoute.delete('/feeds/:id', controllers_1.default.user.deleteFeed);
userRoute.get('/search', controllers_1.default.user.searchUsers);
exports.default = userRoute;
//# sourceMappingURL=user.js.map