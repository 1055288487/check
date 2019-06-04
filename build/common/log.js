"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
log4js.configure({
    appenders: {
        error: { type: 'file', filename: './logs/error.log' },
    },
    categories: {
        default: {
            appenders: ['error'], level: 'error'
        }
    }
});
let errorLog = log4js.getLogger('error');
exports.errorLog = errorLog;
// export default class {
//     public static processLog() {
//         log4js.configure({
//             appenders: {
//                 error: { type: 'file', filename: './logs/error.log' },
//             },
//             categories: {
//                 default: {
//                     appenders: ['error'], level: 'error'
//                 }
//             }
//         })
//         let errorLog = log4js.getLogger('error');
//         return errorLog
//     };
// }
//# sourceMappingURL=log.js.map