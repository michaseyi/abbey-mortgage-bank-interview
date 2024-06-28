"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const templates = {
    verifyEmailSignIn: handlebars_1.default.compile(fs_1.default
        .readFileSync(path_1.default.join(__dirname, 'verify_email_signin.html'))
        .toString()),
};
exports.default = templates;
//# sourceMappingURL=index.js.map