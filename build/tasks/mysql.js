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
const mysql = require("mysql");
const DEBUG = require('debug'), debug = DEBUG('mysql:debug');
require("../common/types");
class Mysql {
    execute(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                let connection = mysql.createConnection(task.check.url);
                connection.connect(function (err) {
                    if (err) {
                        debug('数据库连接异常:error:%s', err);
                        return reject({
                            success: false,
                            msg: err.stack || ''
                        });
                    }
                    else {
                        debug('数据库连接正常:url:%s', task.check.url);
                        connection.end();
                        return resolve({
                            success: true,
                            msg: 'ok'
                        });
                    }
                });
            });
            // .then((data) => {
            //         return data
            //     }).catch((error) => {
            //         return {
            //             success: false,
            //             msg: error.stack || ''
            //         }
            //     })
        });
    }
}
exports.Mysql = Mysql;
exports.default = new Mysql();
//# sourceMappingURL=mysql.js.map