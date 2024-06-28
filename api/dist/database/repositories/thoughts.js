"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createThought = createThought;
exports.deleteThought = deleteThought;
exports.findOne = findOne;
exports.findMany = findMany;
const error_1 = require("../../utils/error");
const db_1 = __importDefault(require("../db"));
const models_1 = __importDefault(require("../models"));
async function createThought(param, tx) {
    const { userId, content } = param;
    const thought = new models_1.default.Thought({ id: userId }, content);
    const manager = tx ? tx : db_1.default;
    try {
        await manager.getRepository(models_1.default.Thought).save(thought);
    }
    catch (error) {
        throw new Error('Error creating thought');
    }
    return thought;
}
async function deleteThought(params, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        await manager.getRepository(models_1.default.Thought).delete(params);
    }
    catch (error) {
        throw new error_1.DatabaseError('Error deleting thought');
    }
}
async function findOne(params, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const thought = await manager
            .getRepository(models_1.default.Thought)
            .findOneBy({ ...params });
        return thought;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving thought');
    }
}
async function findMany(params, skip, take, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const thoughts = await manager
            .getRepository(models_1.default.Thought)
            .find({ where: params, take, skip });
        return thoughts;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving thoughts');
    }
}
//# sourceMappingURL=thoughts.js.map