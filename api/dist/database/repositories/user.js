"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.findOne = findOne;
exports.updateUser = updateUser;
exports.followUser = followUser;
exports.unfollowUser = unfollowUser;
exports.findMany = findMany;
exports.getFollowing = getFollowing;
exports.getFollowers = getFollowers;
exports.isFollowing = isFollowing;
const error_1 = require("../../utils/error");
const db_1 = __importDefault(require("../db"));
const models_1 = __importStar(require("../models"));
async function createUser(params, tx) {
    const { email } = params;
    const user = new models_1.default.User(email);
    const manager = tx ? tx : db_1.default;
    try {
        await manager.getRepository(models_1.default.User).save(user);
    }
    catch (error) {
        throw new error_1.DatabaseError('Error creating user');
    }
    return user;
}
async function findOne(params, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const user = await manager
            .getRepository(models_1.default.User)
            .findOneBy({ ...params });
        return user;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving user');
    }
}
async function updateUser(param, tx) {
    const { id, updates } = param;
    const manager = tx ? tx : db_1.default;
    try {
        await manager.getRepository(models_1.default.User).update({ id }, updates);
    }
    catch (error) {
        throw new error_1.DatabaseError('Error updating user');
    }
}
async function followUser(userId, followId, tx) {
    const manager = tx ? tx : db_1.default;
    const userFollower = new models_1.UserFollowers({ id: userId }, { id: followId });
    try {
        await manager.getRepository(models_1.default.UserFollowers).save(userFollower);
    }
    catch (error) {
        throw new error_1.DatabaseError('Error following user');
    }
}
async function unfollowUser(userId, followId, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        await manager
            .getRepository(models_1.default.UserFollowers)
            .delete({ follower: { id: userId }, following: { id: followId } });
    }
    catch (error) {
        throw new error_1.DatabaseError('Error unfollowing user');
    }
}
async function findMany(params, skip, take, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const users = await manager
            .getRepository(models_1.default.User)
            .find({ where: params, skip, take });
        return users;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving users');
    }
}
async function getFollowing(id, skip, take, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const following = await manager.getRepository(models_1.UserFollowers).find({
            where: { follower: { id } },
            relations: ['following'],
            skip,
            take,
        });
        return following;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving users');
    }
}
async function getFollowers(id, skip, take, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const following = await manager.getRepository(models_1.UserFollowers).find({
            where: { following: { id } },
            relations: ['follower'],
            skip,
            take,
        });
        return following;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving users');
    }
}
async function isFollowing(userId, followingId, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const following = await manager.getRepository(models_1.UserFollowers).findOne({
            where: { follower: { id: userId }, following: { id: followingId } },
        });
        if (following !== null) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving data');
    }
}
//# sourceMappingURL=user.js.map