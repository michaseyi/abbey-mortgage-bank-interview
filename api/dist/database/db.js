"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../config"));
const models_1 = __importDefault(require("./models"));
const db = new typeorm_1.DataSource({
    type: config_1.default.db.type,
    url: config_1.default.db.uri,
    synchronize: true,
    logging: false,
    entities: [
        models_1.default.AuthFlow,
        models_1.default.Session,
        models_1.default.Thought,
        models_1.default.Feed,
        models_1.default.User,
        models_1.default.UserFollowers,
    ],
    subscribers: [],
    migrations: [],
});
exports.default = db;
//# sourceMappingURL=db.js.map