import * as log4js from 'log4js';

log4js.configure({
    appenders: {
        error: { type: 'file', filename: './logs/error.log' },
    },
    categories: {
        default: {
            appenders: ['error'], level: 'error'
        }
    }

})
let errorLog = log4js.getLogger('error');
export { errorLog }

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



