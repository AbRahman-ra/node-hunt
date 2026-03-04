import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
        user: process.env.MAIL_AUTH_USERNAME,
        pass: process.env.MAIL_AUTH_PASSWORD,
    },
});
