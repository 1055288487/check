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
const rq_1 = require("../common/rq");
const DEBUG = require('debug'), debug = DEBUG('http_post:debug');
class HttpPost {
    execute(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield rq_1.default.post(task.check.url);
                if (data.status === 200) {
                    debug('网站服务正常:url:%s', task.check.url);
                    return {
                        success: true,
                        msg: 'ok'
                    };
                }
                debug('网站服务异常：error:%s', data);
                return {
                    success: false,
                    msg: '',
                    data: 'http code: ' + data.status + ' , statusText:' + data.statusText
                };
            }
            catch (error) {
                debug('网站服务异常：error:%s', error);
                return {
                    success: false,
                    msg: error.stack || ''
                };
            }
        });
    }
}
exports.HttpPost = HttpPost;
exports.default = new HttpPost();
//# sourceMappingURL=http_post.js.map