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
const config_1 = require("../config");
const rq_1 = require("../common/rq");
const util_1 = require("../common/util");
class SMS {
    constructor() { }
    send(receiver, content) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                appid: config_1.default.sms.appid,
                token: util_1.default.md5(config_1.default.sms.appSecret + Date.now()),
                receivers: receiver,
                msg: content,
                sender: config_1.default.sms.send,
                timestamp: Date.now()
            };
            let result = yield rq_1.default.post(config_1.default.sms.api, data);
            return result.data.ret === 1 && result.data.data.length > 0;
        });
    }
}
exports.SMS = SMS;
exports.default = new SMS();
//# sourceMappingURL=sms.js.map