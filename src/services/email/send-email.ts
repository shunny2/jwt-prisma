import 'dotenv/config';

import { createTransport } from 'nodemailer';

import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import path from 'path';

import Logging from '../../lib/logging';

import { IMessage } from '../../interfaces/email';

/**
 * This function is responsible for sending emails.
 * @param message IMessage
 * @returns Promise
 */
export const sendEmail = async (message: IMessage): Promise<void> => {
    try {
        const transporter = createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: process.env.SECURE,
            auth: {
                user: process.env.USERNAME,
                pass: process.env.PASSWORD
            },
        });

        const handlebarsOptions = {
            viewEngine: {
                extName: '.handlebars',
                partialsDir: path.resolve(__dirname, '../../views/'),
                defaultLayout: '',
            },
            viewPath: path.resolve(__dirname, '../../views/'),
            extName: '.handlebars'
        };

        transporter.use('compile', nodemailerExpressHandlebars(handlebarsOptions));

        const mailOptions = {
            from: process.env.USERNAME,
            to: message.to?.email,
            subject: message.subject,
            template: message.template.name,
            context: {
                title: message.template.title,
                name: message.to?.name,
                url: message.template.url
            }
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                Logging.error('[SERVICE]: Email not sent.');
                console.error(error);
            } else {
                Logging.success('[SERVICE]: Email sent successfully! ' + info.response);
            }
        });

    } catch (error: any) {
        Logging.error('[SERVICE]: Email not sent.');
        console.error(error);
    }
};