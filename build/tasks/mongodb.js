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
// import * as Mongodb from 'mongodb';
// const MongoClient = Mongodb.MongoClient;
const assert = require("assert");
const MongoClient = require('mongodb').MongoClient;
const DEBUG = require('debug'), debug = DEBUG('mongodb:debug');
require("../common/types");
class Mongodb {
    execute(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                let url = task.check.url;
                MongoClient.connect(url, function (err, db) {
                    try {
                        assert.equal(null, err);
                        debug('数据库连接正常:url:%s', task.check.url);
                        db.close();
                        resolve({
                            success: true,
                            msg: 'ok'
                        });
                    }
                    catch (error) {
                        debug('数据库连接异常:error:%s', error);
                        reject({
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
exports.Mongodb = Mongodb;
exports.default = new Mongodb();
//# sourceMappingURL=mongodb.js.map