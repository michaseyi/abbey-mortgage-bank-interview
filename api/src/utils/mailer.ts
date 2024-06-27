import nodemailer from 'nodemailer';
import config from '../config';

const transporter = nodemailer.createTransport({
  service: config.smtp.service,
  auth: {
    type: config.smtp.authType,
    user: config.smtp.user,
    clientId: config.smtp.clientId,
    clientSecret: config.smtp.clientSecret,
    refreshToken: config.smtp.refreshToken,
    accessToken: config.smtp.accessToken,
  },
} as any);

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: config.smtp.user,
    to,
    subject,
    html,
  });
}
