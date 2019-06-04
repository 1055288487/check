"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    /**
     * 返回正确的数据
     * @param _data
     */
    ok(_data) {
        return {
            success: true,
            msg: 'ok',
            data: _data
        };
    }
    /**
     *
     * @param _msg 数据异常数据
     * @param _data
     */
    bad(_msg, _data) {
        return {
            success: false,
            msg: _msg || '',
            data: _data
        };
    }
}
exports.Base = Base;
// export default new Base()
//# sourceMappingURL=Base.js.map