"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFeed = createFeed;
exports.deleteFeed = deleteFeed;
exports.findMany = findMany;
exports.findOne = findOne;
const error_1 = require("../../utils/error");
const db_1 = __importDefault(require("../db"));
const models_1 = __importDefault(require("../models"));
async function createFeed(params, tx) {
    const { userId, thoughtId } = params;
    const feed = new models_1.default.Feed({ id: userId }, { id: thoughtId });
    const manager = tx ? tx : db_1.default;
    try {
        return await manager.getRepository(models_1.default.Feed).save(feed);
    }
    catch (error) {
        throw new error_1.DatabaseError('Error creating feed');
    }
}
async function deleteFeed(params, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        await manager.getRepository(models_1.default.Feed).delete(params);
    }
    catch (error) {
        throw new error_1.DatabaseError('Error deleting feed');
    }
}
async function findMany(params, skip, take, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const feeds = await manager
            .getRepository(models_1.default.Feed)
            .find({ where: params, skip, take, relations: ['thought'] });
        return feeds;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving feeds');
    }
}
async function findOne(params, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const feed = await manager
            .getRepository(models_1.default.Feed)
            .findOneBy({ ...params });
        return feed;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving feed');
    }
}
//# sourceMappingURL=feed.js.map