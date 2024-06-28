"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.deleteFeed = exports.getFeeds = exports.unfollowUser = exports.getFollowers = exports.getFollowing = exports.followUser = exports.getThoughts = exports.deleteThought = exports.createThought = exports.updateUsername = exports.updateUser = exports.getUser = void 0;
const user_1 = require("../services/user");
const services_1 = __importDefault(require("../services"));
const getUser = async (ctx) => {
    const user = await (0, user_1.findUser)(ctx.state.user.id);
    if (user === null) {
        ctx.throw(404);
        return;
    }
    ctx.status = 200;
    ctx.body = {
        firstname: user.firstname ?? '',
        lastname: user.lastname ?? '',
        profilePicture: user.profilePicture ?? '',
        id: user.id,
        username: user.username ?? ' ',
        email: user.email,
        bio: user.bio ?? '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
exports.getUser = getUser;
function validateUpdateUserBody(value) {
    if (typeof value !== 'object') {
        return false;
    }
    if (value.firstname !== undefined && typeof value.firstname !== 'string') {
        return false;
    }
    if (value.lastname !== undefined && typeof value.lastname !== 'string') {
        return false;
    }
    if (value.bio !== undefined && typeof value.bio !== 'string') {
        return false;
    }
    return true;
}
const updateUser = async (ctx) => {
    if (!validateUpdateUserBody(ctx.request.body)) {
        ctx.throw(400);
        return;
    }
    const userData = ctx.request.body;
    const userUpdates = {
        firstname: userData.firstname ?? undefined,
        lastname: userData.lastname ?? undefined,
        bio: userData.bio ?? undefined,
    };
    await services_1.default.user.updateUser(ctx.state.user.id, userUpdates);
    ctx.status = 200;
    ctx.body = {
        message: 'User updated',
    };
};
exports.updateUser = updateUser;
function validateUpdateUsernameBody(value) {
    if (typeof value !== 'object') {
        return false;
    }
    if (typeof value.username !== 'string') {
        return false;
    }
    return true;
}
const updateUsername = async (ctx) => {
    if (!validateUpdateUsernameBody(ctx.request.body)) {
        ctx.throw(400);
        return;
    }
    const { username } = ctx.request.body;
    await services_1.default.user.updateUsername(ctx.state.user.id, username);
    ctx.status = 200;
    ctx.body = {
        message: 'Username updated',
    };
};
exports.updateUsername = updateUsername;
function validateCreateThoughtBody(value) {
    if (typeof value !== 'object') {
        return false;
    }
    if (typeof value.content !== 'string') {
        return false;
    }
    return true;
}
const createThought = async (ctx) => {
    if (!validateCreateThoughtBody(ctx.request.body)) {
        ctx.throw(400);
        return;
    }
    const { content } = ctx.request.body;
    const thought = await services_1.default.user.createThought(ctx.state.user.id, content);
    ctx.status = 200;
    ctx.body = {
        thought,
    };
};
exports.createThought = createThought;
const deleteThought = async (ctx) => {
    const { id } = ctx.params;
    await services_1.default.user.deleteThought(id, ctx.state.user.id);
    ctx.status = 200;
    ctx.body = {
        message: 'Thought deleted',
    };
};
exports.deleteThought = deleteThought;
const getThoughts = async (ctx) => {
    const id = ctx.query.userId && !(ctx.query.userId instanceof Array)
        ? ctx.query.userId
        : ctx.state.user.id;
    const start = ctx.query.start && !(ctx.query.start instanceof Array)
        ? parseInt(ctx.query.start)
        : 0;
    const limit = ctx.query.limit && !(ctx.query.limit instanceof Array)
        ? parseInt(ctx.query.limit)
        : 10;
    const thoughts = await services_1.default.user.getThoughts(id, start, limit);
    ctx.body = {
        thoughts,
    };
};
exports.getThoughts = getThoughts;
const followUser = async (ctx) => {
    const { id } = ctx.params;
    await services_1.default.user.followUser(ctx.state.user.id, id);
    ctx.body = {
        message: 'User followed',
    };
};
exports.followUser = followUser;
const getFollowing = async (ctx) => {
    const skip = ctx.query.start && !(ctx.query.start instanceof Array)
        ? parseInt(ctx.query.start)
        : 0;
    const take = ctx.query.limit && !(ctx.query.limit instanceof Array)
        ? parseInt(ctx.query.limit)
        : 10;
    const followings = await services_1.default.user.getFollowing(ctx.state.user.id, skip, take);
    ctx.body = {
        followings,
    };
};
exports.getFollowing = getFollowing;
const getFollowers = async (ctx) => {
    const skip = ctx.query.start && !(ctx.query.start instanceof Array)
        ? parseInt(ctx.query.start)
        : 0;
    const take = ctx.query.limit && !(ctx.query.limit instanceof Array)
        ? parseInt(ctx.query.limit)
        : 10;
    const followers = await services_1.default.user.getFollowers(ctx.state.user.id, skip, take);
    ctx.body = {
        followers,
    };
};
exports.getFollowers = getFollowers;
const unfollowUser = async (ctx) => {
    const { id } = ctx.params;
    await services_1.default.user.unfollowUser(ctx.state.user.id, id);
    ctx.body = {
        message: 'User unfollowed',
    };
};
exports.unfollowUser = unfollowUser;
const getFeeds = async (ctx) => {
    const skip = ctx.query.start && !(ctx.query.start instanceof Array)
        ? parseInt(ctx.query.start)
        : 0;
    const take = ctx.query.limit && !(ctx.query.limit instanceof Array)
        ? parseInt(ctx.query.limit)
        : 10;
    const feeds = await services_1.default.user.getFeeds(ctx.state.user.id, skip, take);
    ctx.body = {
        feeds,
    };
};
exports.getFeeds = getFeeds;
const deleteFeed = async (ctx) => {
    const { id } = ctx.params;
    await services_1.default.user.deleteFeed(ctx.state.user.id, id);
    ctx.body = {
        message: 'Feed deleted',
    };
};
exports.deleteFeed = deleteFeed;
const searchUsers = async (ctx) => {
    if (typeof ctx.query.q !== 'string') {
        ctx.body = {
            result: [],
        };
        return;
    }
    const skip = ctx.query.start && !(ctx.query.start instanceof Array)
        ? parseInt(ctx.query.start)
        : 0;
    const take = ctx.query.limit && !(ctx.query.limit instanceof Array)
        ? parseInt(ctx.query.limit)
        : 10;
    const result = await services_1.default.user.searchUsers(ctx.state.user.id, ctx.query.q, skip, take);
    ctx.body = {
        result,
    };
};
exports.searchUsers = searchUsers;
//# sourceMappingURL=user.js.map