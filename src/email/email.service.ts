import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import config from 'src/config/config';


@Injectable()
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config().email.emailId,// set in your .env
            pass: config().email.password, // set in your .env
        },
    });

    async sendOTP(email: string, otp: string) {
        try {
            const info = await this.transporter.sendMail({
                from: `"User Management Portal" <${config().email.emailId}>`,
                to: email,
                subject: 'Your OTP Code',
                text: `Your OTP code is: ${otp}`,
                html: `<p>Your OTP code is: <b>${otp}</b></p>`,
            });
            return info;
        } catch (error) {
            console.error('Error sending OTP email:', error);
            throw error;
        }
    }
}