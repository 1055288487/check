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
const net = require("net");
const DEBUG = require('debug'), debug = DEBUG('tcp:debug');
class TCP {
    execute(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                let socket = new net.Socket();
                socket.connect(task.port, task.check.url, function () {
                    socket.end();
                    debug('网站服务正常:url:%s', task.check.url);
                    resolve({
                        success: true,
                        msg: 'ok'
                    });
                });
                socket.on('error', function (err) {
                    socket.destroy();
                    debug('网站服务异常：err:%s', err);
                    reject({
                        success: false,
                        msg: err.stack || ''
                    });
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
exports.TCP = TCP;
exports.default = new TCP();
//# sourceMappingURL=tcp.js.map