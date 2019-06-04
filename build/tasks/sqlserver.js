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
const mssql = require('mssql');
const DEBUG = require('debug'), debug = DEBUG('sqlserver:debug');
require("../common/types");
class Sqlserver {
    execute(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield mssql.connect(task.check.url);
                        debug('数据库连接正常:url:%s', task.check.url);
                        mssql.close();
                        return resolve({
                            success: true,
                            msg: 'ok'
                        });
                    }
                    catch (error) {
                        debug('数据库连接异常:error:%s', error);
                        return reject({
                            success: false,
                            msg: error.stack || ''
                        });
                    }
                });
            });
            // .then((data) => {
            //     return data
            // }).catch((error) => {
            //     return {
            //         success: false,
            //         msg: error.stack || ''
            //     }
            // })
        });
    }
}
exports.Sqlserver = Sqlserver;
exports.default = new Sqlserver();
//# sourceMappingURL=sqlserver.js.map