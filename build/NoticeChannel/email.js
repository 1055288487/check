"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const nodemailer = require("nodemailer");
const smtpPool = require("nodemailer-smtp-pool");
const DEBUG = require('debug'), debug = DEBUG('email:debug');
class Email {
    constructor() { }
    send(to, textbody, subject, htmlbody) {
        return __awaiter(this, void 0, void 0, function* () {
            const transport = yield nodemailer.createTransport(smtpPool({
                host: config_1.default.email.host,
                port: config_1.default.email.port || 25,
                auth: {
                    user: config_1.default.email.user,
                    pass: config_1.default.email.pass
                },
                maxConnections: 5,
                maxMessages: 20 // (defaults to 100) limits the message count to be sent using a single connection. After maxMessages messages the connection is dropped and a new one is created for the following messages
            }));
            let mailOptions = {
                from: config_1.default.email.from,
                to: to,
                subject: subject,
                text: textbody,
                html: htmlbody // html body
            };
            debug('mailOptions:', mailOptions);
            // send mail with defined transport object
            return new Promise(function (resolve, reject) {
                transport.sendMail(mailOptions, function (error, info) {
                    if (error)
                        return reject(error);
                    debug('send info:%s', info);
                    resolve(info);
                });
            });
        });
    }
    ;
}
exports.Email = Email;
exports.default = new Email();
//# sourceMappingURL=email.js.map