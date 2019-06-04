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
const Enums = require("./common/Enums");
const channel = require("./NoticeChannel");
const MessageHandler_1 = require("./common/MessageHandler");
const config_1 = require("./config");
require("./common/types");
const util = require("util");
class NoticeService {
    static start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield MessageHandler_1.default.consume((e) => __awaiter(this, void 0, void 0, function* () {
                let data = e.data;
                for (let i = 0; i < data.notify.length; i++) {
                    let item = data.notify[i];
                    if (item.type === Enums.PushType.sms) {
                        yield channel.sms.send(item.receiver, util.format(config_1.default.sms.content, data.name, data.description));
                    }
                    if (item.type === Enums.PushType.email) {
                        yield channel.email.send(item.receiver, util.format(config_1.default.email.body, data.name, data.description), util.format(config_1.default.email.title, data.name, data.description), util.format(config_1.default.email.htmlbody, data.name, data.description));
                    }
                }
            }));
        });
    }
}
exports.NoticeService = NoticeService;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield NoticeService.start();
    });
}());
//# sourceMappingURL=NoticeService.js.map