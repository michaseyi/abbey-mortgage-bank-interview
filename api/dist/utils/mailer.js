"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const transporter = nodemailer_1.default.createTransport({
    service: config_1.default.smtp.service,
    auth: {
        type: config_1.default.smtp.authType,
        user: config_1.default.smtp.user,
        clientId: config_1.default.smtp.clientId,
        clientSecret: config_1.default.smtp.clientSecret,
        refreshToken: config_1.default.smtp.refreshToken,
        accessToken: config_1.default.smtp.accessToken,
    },
});
async function sendEmail(to, subject, html) {
    await transporter.sendMail({
        from: config_1.default.smtp.user,
        to,
        subject,
        html,
    });
}
//# sourceMappingURL=mailer.js.map