"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const controllers_1 = __importDefault(require("../controllers"));
const authRoute = new koa_router_1.default({
    prefix: '/auth',
});
authRoute.post('/start-email-signin-flow', controllers_1.default.auth.startEmailSignInFlow);
authRoute.post('/verify-email-signin-flow', controllers_1.default.auth.verifyEmailSignInFlow);
authRoute.get('/signout', controllers_1.default.auth.protectedRoute, controllers_1.default.auth.signOut);
authRoute.get('/me', controllers_1.default.auth.protectedRoute, controllers_1.default.user.getUser);
authRoute.get('/sessions', controllers_1.default.auth.protectedRoute, controllers_1.default.auth.getSessions);
authRoute.delete('/sessions/:id', controllers_1.default.auth.protectedRoute, controllers_1.default.auth.deleteSession);
exports.default = authRoute;
//# sourceMappingURL=auth.js.map