"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.findUser = findUser;
exports.updateUser = updateUser;
exports.updateUsername = updateUsername;
exports.updateEmail = updateEmail;
exports.createThought = createThought;
exports.deleteThought = deleteThought;
exports.getThoughts = getThoughts;
exports.followUser = followUser;
exports.getFollowing = getFollowing;
exports.getFollowers = getFollowers;
exports.unfollowUser = unfollowUser;
exports.createFeedForFollowers = createFeedForFollowers;
exports.createFeedFromFollowedUser = createFeedFromFollowedUser;
exports.deleteFeedFromUnfollowedUser = deleteFeedFromUnfollowedUser;
exports.getFeeds = getFeeds;
exports.deleteFeed = deleteFeed;
exports.searchUsers = searchUsers;
const error_1 = require("../utils/error");
const repositories_1 = __importDefault(require("../database/repositories"));
const typeorm_1 = require("typeorm");
async function createUser(email, tx) {
    const exisitingUser = await repositories_1.default.user.findOne({ email }, tx);
    if (exisitingUser !== null) {
        throw new error_1.ConflictError('User with same email already exists');
    }
    const user = await repositories_1.default.user.createUser({ email });
    return user;
}
async function findUser(id, email, tx) {
    const user = await repositories_1.default.user.findOne({ id, email }, tx);
    return user;
}
async function updateUser(id, updates, tx) {
    await repositories_1.default.user.updateUser({ id, updates }, tx);
}
async function updateUsername(id, username, tx) {
    if ((await repositories_1.default.user.findOne({ username }, tx)) !== null) {
        throw new error_1.ConflictError('Username taken');
    }
    await repositories_1.default.user.updateUser({ id, updates: { username } }, tx);
}
async function updateEmail(id, email, tx) {
    if (findUser(undefined, email) !== null) {
        throw new error_1.ConflictError('Email already exists');
    }
    // create new auth flow
}
async function createThought(userId, content, tx) {
    const thought = await repositories_1.default.thought.createThought({ userId, content }, tx);
    // generate feeds
    createFeedForFollowers(userId, thought.id);
    return thought;
}
async function deleteThought(id, userId, tx) {
    await repositories_1.default.thought.deleteThought({ user: { id: userId }, id }, tx);
}
async function getThoughts(userId, skip, take, tx) {
    const thoughts = await repositories_1.default.thought.findMany({ user: { id: userId } }, skip, take, tx);
    return thoughts;
}
async function followUser(userId, followId, tx) {
    if (userId === followId) {
        throw new error_1.ConflictError('Cannot follow self');
    }
    const follow = await repositories_1.default.user.findOne({ id: followId }, tx);
    if (follow === null) {
        throw new error_1.NotFoundError('User to be followed not found');
    }
    await repositories_1.default.user.followUser(userId, followId, tx);
    // create feed for followed user
    createFeedFromFollowedUser(userId, followId);
}
async function getFollowing(userId, skip, take, tx) {
    return await repositories_1.default.user.getFollowing(userId, skip, take, tx);
}
async function getFollowers(userId, skip, take, tx) {
    return await repositories_1.default.user.getFollowers(userId, skip, take, tx);
}
async function unfollowUser(userId, followId, tx) {
    if (userId === followId) {
        throw new error_1.ConflictError('Cannot unfollow self');
    }
    const follow = await repositories_1.default.user.findOne({ id: followId }, tx);
    if (follow === null) {
        throw new error_1.NotFoundError('User to be unfollowed not found');
    }
    await repositories_1.default.user.unfollowUser(userId, followId, tx);
    // delete feed from unfollowed user
    deleteFeedFromUnfollowedUser(userId, followId);
}
async function createFeedForFollowers(userId, thoughtId) {
    // This would usually be a background job, or kept in a queue for processing by a feed server
    setTimeout(async () => {
        const followers = await repositories_1.default.user.getFollowers(userId, 0);
        for (const follower of followers) {
            repositories_1.default.feed
                .createFeed({
                userId: follower.follower.id,
                thoughtId,
            })
                .catch(() => { });
        }
    }, 0);
}
async function createFeedFromFollowedUser(userId, followedUserId) {
    // This would usually be a background job, or kept in a queue for processing by a feed server
    setTimeout(async () => {
        const thoughts = await repositories_1.default.thought.findMany({ user: { id: followedUserId } }, 0);
        for (const thought of thoughts) {
            // if you follow and unfollow someone, there might be dupllicate feeds and the db will see that as a conflict so just ignore any errors
            repositories_1.default.feed
                .createFeed({ userId, thoughtId: thought.id })
                .catch(() => { });
        }
    }, 0);
}
async function deleteFeedFromUnfollowedUser(userId, followedUserId) {
    // This would usually be a background job, or kept in a queue for processing by a feed server
    setTimeout(async () => {
        const thoughts = await repositories_1.default.thought.findMany({ user: { id: followedUserId } }, 0);
        for (const thought of thoughts) {
            repositories_1.default.feed
                .deleteFeed({
                user: { id: userId },
                thought: { id: thought.id },
            })
                .catch(() => { });
        }
    }, 0);
}
async function getFeeds(userId, skip, take, tx) {
    return await repositories_1.default.feed.findMany({ user: { id: userId } }, skip, take, tx);
}
async function deleteFeed(userId, feedId, tx) {
    const feed = await repositories_1.default.feed.findOne({ id: feedId }, tx);
    if (feed === null) {
        throw new error_1.NotFoundError('Feed not found');
    }
    await repositories_1.default.feed.deleteFeed({
        user: { id: userId },
        id: feedId,
    }, tx);
}
async function searchUsers(userId, query, skip, take, tx) {
    const result = await repositories_1.default.user.findMany({
        id: (0, typeorm_1.Not)(userId),
        email: (0, typeorm_1.Like)(`%${query}%`),
    }, skip, take, tx);
    const isFollowings = await Promise.all(result.map((user) => repositories_1.default.user.isFollowing(userId, user.id)));
    return result.map((user, i) => ({
        ...user,
        isFollowing: isFollowings[i],
    }));
}
//# sourceMappingURL=user.js.map