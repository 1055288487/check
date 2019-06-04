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
const schedule = require("node-schedule");
const tasks = require("./tasks/index");
const taskConfigs_1 = require("./taskConfigs");
const MessagePush_1 = require("./common/MessagePush");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        for (let task of taskConfigs_1.default.tasks) {
            yield schedule.scheduleJob(task.cron, () => __awaiter(this, void 0, void 0, function* () {
                let ts = tasks;
                let itask = ts[task.check.type]; // 动态获取
                try {
                    let data = yield itask.execute(task);
                    yield MessagePush_1.default.Push(task, data);
                }
                catch (error) {
                    yield MessagePush_1.default.Push(task, { success: false, msg: error.stack || '' }); // 调用时在外部统一处理错误
                }
            }));
        }
    });
}());
//# sourceMappingURL=index.js.map