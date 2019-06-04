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
const MessageHandler_1 = require("../common/MessageHandler");
const DEBUG = require('debug'), debug = DEBUG('MessagePush:debug');
require("./types");
const log = require("./log");
class MessagePush {
    constructor() {
        this.filter = new Map();
    }
    // filter: Set<string> = new Set<string>();
    /**
     * 过滤数组(连续三次错误则丢进队列提醒,只发一次)
     * @param data
     */
    Push(task, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.success === false) {
                log.errorLog.error('检测内容：%s，检测结果：%s', JSON.stringify(task), JSON.stringify(data));
            }
            if (data.success && this.filter.has(task.name) && this.filter.delete(task.name)) {
                return;
            }
            // log.errorLog.error('检测内容：%s，检测结果：%s', JSON.stringify(task), JSON.stringify(data))
            if (!task.errorLimit) {
                task.errorLimit = 3;
            }
            if (this.filter.has(task.name)) {
                let count = this.filter.get(task.name);
                if (count === task.errorLimit) {
                    task.data = data.data;
                    debug('队列信息：%s', task);
                    yield MessageHandler_1.default.publish({ data: task });
                }
                debug('失败次数：%s', this.filter.get(task.name));
                count++;
                this.filter.set(task.name, count);
                return;
            }
            this.filter.set(task.name, 1);
        });
    }
}
exports.MessagePush = MessagePush;
exports.default = new MessagePush();
//# sourceMappingURL=MessagePush.js.map