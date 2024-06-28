"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const user_1 = __importDefault(require("./user"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_1 = require("koa");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const error_1 = require("../utils/error");
const routes = new koa_router_1.default({
    prefix: '/api/v1',
});
routes.use(async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        let status;
        let message;
        if (err instanceof koa_1.HttpError) {
            status = err.status;
            message = err.message;
        }
        else if (err instanceof error_1.NotFoundError) {
            status = 404;
            message = err.message;
        }
        else if (err instanceof error_1.DatabaseError) {
            status = 500;
            message = err.message;
        }
        else if (err instanceof error_1.UnauthorizedError) {
            status = 401;
            message = err.message;
        }
        else if (err instanceof error_1.ConflictError) {
            status = 409;
            message = err.message;
        }
        else {
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
routes.use((0, koa_bodyparser_1.default)());
routes.use(auth_1.default.routes());
routes.use(user_1.default.routes());
exports.default = routes;
//# sourceMappingURL=index.js.map