"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("./join");
var JoinArrayUtil;
(function (JoinArrayUtil) {
    function isJoinArray(raw) {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!join_1.Join.isJoin(item)) {
                return false;
            }
        }
        return true;
    }
    JoinArrayUtil.isJoinArray = isJoinArray;
})(JoinArrayUtil = exports.JoinArrayUtil || (exports.JoinArrayUtil = {}));
//# sourceMappingURL=join-array.js.map