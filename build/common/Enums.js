"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 通知类型
 */
var PushType;
(function (PushType) {
    PushType[PushType["sms"] = 1] = "sms";
    PushType[PushType["email"] = 2] = "email";
    PushType[PushType["im"] = 3] = "im";
})(PushType = exports.PushType || (exports.PushType = {}));
var allowPush;
(function (allowPush) {
    allowPush[allowPush["allow"] = 1] = "allow";
    allowPush[allowPush["disallow"] = 2] = "disallow";
})(allowPush = exports.allowPush || (exports.allowPush = {}));
var NotifyEnum;
(function (NotifyEnum) {
    NotifyEnum[NotifyEnum["sms"] = 1] = "sms";
})(NotifyEnum = exports.NotifyEnum || (exports.NotifyEnum = {}));
//# sourceMappingURL=Enums.js.map