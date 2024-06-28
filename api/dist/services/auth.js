"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startEmailSignInFlow = startEmailSignInFlow;
exports.verifyEmailSignInFlow = verifyEmailSignInFlow;
exports.getUserFromSessionToken = getUserFromSessionToken;
const tokens_1 = require("../utils/tokens");
const repositories_1 = __importDefault(require("../database/repositories"));
const mailer_1 = require("../utils/mailer");
const email_templates_1 = __importDefault(require("../email_templates"));
const error_1 = require("../utils/error");
const user_1 = require("./user");
const db_1 = __importDefault(require("../database/db"));
async function startEmailSignInFlow(email) {
    const token = (0, tokens_1.generateToken)(6);
    // TODO: Set a timer to delete the auth flow after a certain amount of time
    const authFlow = await repositories_1.default.authFlow.createAuthFlow({
        email,
        token,
    });
    // TODO: Handle email sending errors. Await or not?
    try {
        await (0, mailer_1.sendEmail)(email, 'Email Sign In Token', email_templates_1.default.verifyEmailSignIn({ token }));
    }
    catch (error) { }
    return authFlow.id;
}
async function verifyEmailSignInFlow(flowId, token) {
    const sessionToken = await db_1.default.transaction(async (tx) => {
        const authFlow = await repositories_1.default.authFlow.findOne({ id: flowId }, tx);
        if (authFlow === null) {
            throw new error_1.NotFoundError('Auth flow not found');
        }
        if (authFlow.token !== token) {
            throw new error_1.UnauthorizedError('Auth flow token does not match');
        }
        let user = await (0, user_1.findUser)(undefined, authFlow.email, tx);
        if (user === null) {
            user = await (0, user_1.createUser)(authFlow.email, tx);
        }
        const session = await repositories_1.default.session.createSession({
            userId: user.id,
        }, tx);
        await repositories_1.default.authFlow.deleteAuthFlow({ id: flowId }, tx);
        return session.id;
    });
    return sessionToken;
}
async function getUserFromSessionToken(sessionToken) {
    const session = await repositories_1.default.session.findOne({ id: sessionToken });
    if (session === null) {
        throw new error_1.UnauthorizedError('Session not found');
    }
    return session.user.id;
}
//# sourceMappingURL=auth.js.map