"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = require("process");
dotenv_1.default.config();
function validateConfig(config) {
    if (typeof config.environment !== 'string') {
        throw new Error('Config must have an environment string');
    }
    if (typeof config.app.port !== 'number') {
        throw new Error('Config must have an app.port number');
    }
    if (typeof config.db.uri !== 'string') {
        throw new Error('Config must have a db.uri string');
    }
    if (!['postgres', 'mysql', 'mongodb'].includes(config.db.type)) {
        throw new Error('Config db.type must be one of postgres, mysql, or mongodb');
    }
    if (typeof config.jwt.secret !== 'string') {
        throw new Error('Config must have a jwt.secret string');
    }
    if (typeof config.jwt.expiresIn !== 'string') {
        throw new Error('Config must have a jwt.expiresIn string');
    }
    if (typeof config.smtp.clientId !== 'string') {
        throw new Error('Config must have an smtp.clientId string');
    }
    if (typeof config.smtp.user !== 'string') {
        throw new Error('Config must have an smtp.user string');
    }
    if (typeof config.smtp.clientSecret !== 'string') {
        throw new Error('Config must have an smtp.clientSecret string');
    }
    if (typeof config.smtp.refreshToken !== 'string') {
        throw new Error('Config must have an smtp.refreshToken string');
    }
    if (typeof config.smtp.accessToken !== 'string') {
        throw new Error('Config must have an smtp.accessToken string');
    }
    if (typeof config.smtp.authType !== 'string') {
        throw new Error('Config must have an smtp.authType string');
    }
    if (typeof config.smtp.service !== 'string') {
        throw new Error('Config must have an smtp.service string');
    }
}
const config = {
    environment: process_1.env.ENVIRONMENT ?? 'development',
    app: {
        port: process_1.env.PORT ? +process_1.env.PORT : 3000,
    },
    db: {
        uri: process_1.env.DB_URI,
        type: process_1.env.DB_TYPE,
    },
    jwt: {
        secret: process_1.env.JWT_SECRET,
        expiresIn: process_1.env.JWT_EXPIRES_IN,
    },
    smtp: {
        clientId: process_1.env.SMTP_CLIENT_ID,
        user: process_1.env.SMTP_USER,
        clientSecret: process_1.env.SMTP_CLIENT_SECRET,
        accessToken: process_1.env.SMTP_ACCESS_TOKEN,
        refreshToken: process_1.env.SMTP_REFRESH_TOKEN,
        service: process_1.env.SMTP_SERVICE,
        authType: process_1.env.SMTP_AUTH_TYPE,
    },
};
validateConfig(config);
exports.default = config;
//# sourceMappingURL=config.js.map