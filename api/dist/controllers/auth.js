"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.getSessions = exports.verifyEmailSignInFlow = exports.signOut = exports.protectedRoute = exports.startEmailSignInFlow = void 0;
const services_1 = __importDefault(require("../services"));
const repositories_1 = __importDefault(require("../database/repositories"));
function validateSignInWithEmailBody(value) {
    if (typeof value !== 'object') {
        return false;
    }
    if (typeof value.email !== 'string') {
        return false;
    }
    return true;
}
const startEmailSignInFlow = async (ctx) => {
    if (!validateSignInWithEmailBody(ctx.request.body)) {
        ctx.throw(400);
        return;
    }
    const { email } = ctx.request.body;
    try {
        const flowId = await services_1.default.auth.startEmailSignInFlow(email);
        ctx.status = 201;
        ctx.body = {
            flowId,
        };
    }
    catch (error) {
        ctx.throw(500);
    }
};
exports.startEmailSignInFlow = startEmailSignInFlow;
const protectedRoute = async (ctx, next) => {
    const authorizationToken = ctx.request.headers['authorization'];
    if (!authorizationToken) {
        ctx.throw(401);
        return;
    }
    const authorizationTokenSplit = authorizationToken.split(' ');
    if (authorizationTokenSplit.length !== 2) {
        ctx.throw(401);
        return;
    }
    const sessionToken = authorizationTokenSplit[1];
    ctx.state.user = {
        sessionId: sessionToken,
        id: await services_1.default.auth.getUserFromSessionToken(sessionToken),
    };
    await next();
};
exports.protectedRoute = protectedRoute;
const signOut = async (ctx) => {
    const sessionId = ctx.state.user.sessionId;
    await repositories_1.default.session.deleteSession({ id: sessionId });
    ctx.status = 200;
    ctx.body = {
        message: 'Signed out',
    };
};
exports.signOut = signOut;
function validateVerifyEmailBody(value) {
    if (typeof value !== 'object') {
        return false;
    }
    if (typeof value.flowId !== 'string') {
        return false;
    }
    if (typeof value.token !== 'string') {
        return false;
    }
    return true;
}
const verifyEmailSignInFlow = async (ctx) => {
    if (!validateVerifyEmailBody(ctx.request.body)) {
        ctx.throw(400);
        return;
    }
    const { flowId, token } = ctx.request.body;
    const sessionToken = await services_1.default.auth.verifyEmailSignInFlow(flowId, token);
    ctx.body = {
        sessionToken,
    };
};
exports.verifyEmailSignInFlow = verifyEmailSignInFlow;
const getSessions = async (ctx) => {
    const { id } = ctx.state.user;
    const start = ctx.query.start && !(ctx.query.start instanceof Array)
        ? parseInt(ctx.query.start)
        : 0;
    const limit = ctx.query.limit && !(ctx.query.limit instanceof Array)
        ? parseInt(ctx.query.limit)
        : 10;
    const sessions = await repositories_1.default.session.findMany({ user: { id } }, start, limit);
    ctx.body = {
        sessions,
    };
};
exports.getSessions = getSessions;
const deleteSession = async (ctx) => {
    const { id } = ctx.state.user;
    const sessionId = ctx.params.id;
    await repositories_1.default.session.deleteSession({ user: { id }, id: sessionId });
    ctx.status = 200;
    ctx.body = {
        message: 'Session deleted',
    };
};
exports.deleteSession = deleteSession;
//# sourceMappingURL=auth.js.map