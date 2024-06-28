"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.deleteSession = deleteSession;
exports.findOne = findOne;
exports.findMany = findMany;
const error_1 = require("../../utils/error");
const db_1 = __importDefault(require("../../database/db"));
const models_1 = __importDefault(require("../models"));
async function createSession(params, tx) {
    const { userId } = params;
    const session = new models_1.default.Session({ id: userId });
    const manager = tx ? tx : db_1.default;
    try {
        await manager.getRepository(models_1.default.Session).save(session);
    }
    catch (error) {
        throw new error_1.DatabaseError('Error creating session');
    }
    return session;
}
async function deleteSession(params, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        await manager.getRepository(models_1.default.Session).delete({ ...params });
    }
    catch (error) {
        throw new error_1.DatabaseError('Error deleting session');
    }
}
async function findOne(params, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const session = await manager
            .getRepository(models_1.default.Session)
            .findOne({ where: params, relations: ['user'] });
        return session;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving session');
    }
}
async function findMany(params, skip, take, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const sessions = await manager
            .getRepository(models_1.default.Session)
            .find({ where: params, skip, take });
        return sessions;
    }
    catch (error) {
        throw new error_1.DatabaseError('Error retrieving sessions');
    }
}
//# sourceMappingURL=session.js.map