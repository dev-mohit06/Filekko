import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';

dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE,
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendEmail({ to, subject, text, html }) {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            return info.response;
        } catch (error) {
            console.error('Error sending email:', error.message);
        }
    }

    generateEmailVerificationLink(token) {
        return `${process.env.DEV_FRONTEND_URL}/auth/verify-email/${token}`;
    }

    generateToken() {
        return uuid();
    }
}

export default new EmailService();