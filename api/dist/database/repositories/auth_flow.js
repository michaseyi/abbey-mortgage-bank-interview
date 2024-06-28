"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthFlow = createAuthFlow;
exports.findOne = findOne;
exports.deleteAuthFlow = deleteAuthFlow;
const error_1 = require("../../utils/error");
const db_1 = __importDefault(require("../db"));
const models_1 = __importDefault(require("../models"));
async function createAuthFlow(params, tx) {
    const { email, token } = params;
    const authFlow = new models_1.default.AuthFlow(email, token);
    const manager = tx ? tx : db_1.default;
    try {
        await manager.getRepository(models_1.default.AuthFlow).save(authFlow);
    }
    catch (error) {
        throw new error_1.DatabaseError('Error creating auth flow');
    }
    return authFlow;
}
async function findOne(params, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        const authFlow = await manager
            .getRepository(models_1.default.AuthFlow)
            .findOneBy({ ...params });
        return authFlow;
    }
    catch (error) {
        console.log(error);
        throw new error_1.DatabaseError('Error retrieving auth flow');
    }
}
async function deleteAuthFlow(params, tx) {
    const manager = tx ? tx : db_1.default;
    try {
        await manager.getRepository(models_1.default.AuthFlow).delete({ ...params });
    }
    catch (error) {
        throw new error_1.DatabaseError('Error deleting auth flow');
    }
}
//# sourceMappingURL=auth_flow.js.map