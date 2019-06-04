import config from '../config'
import * as nodemailer from 'nodemailer';
import * as smtpPool from 'nodemailer-smtp-pool';
const DEBUG = require('debug'),
    debug = DEBUG('email:debug');
export class Email implements IChannel {

    constructor() { }

    async send(to: string, textbody: string, subject: string, htmlbody: string): Promise<any> {
        const transport = await nodemailer.createTransport(smtpPool({
            host: config.email.host,
            port: config.email.port || 25,
            auth: {
                user: config.email.user,
                pass: config.email.pass
            },
            maxConnections: 5, // (defaults to 5) is the count of maximum simultaneous connections to make against the SMTP server 
            maxMessages: 20 // (defaults to 100) limits the message count to be sent using a single connection. After maxMessages messages the connection is dropped and a new one is created for the following messages
        }));

        let mailOptions = {
            from: config.email.from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: textbody, // plaintext body
            html: htmlbody // html body
        };

        debug('mailOptions:', mailOptions)
        // send mail with defined transport object

        return new Promise(function (resolve: Function, reject: Function) {
            transport.sendMail(mailOptions, function (error: any, info: any) {
                if (error) return reject(error);
                debug('send info:%s', info);
                resolve(info);
            });

        });


    };
}

export default new Email();