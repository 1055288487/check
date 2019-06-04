"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class default_1 {
    static md5(value) {
        return crypto.createHash('md5').update(value).digest('hex');
    }
}
exports.default = default_1;
//# sourceMappingURL=util.js.map