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
    function toNullable(joins) {
        return joins.map((join) => {
            return join_1.Join.toNullable(join);
        });
    }
    JoinArrayUtil.toNullable = toNullable;
    function replaceColumn(joins, column) {
        return joins.map(join => join_1.Join.replaceColumn(join, column));
    }
    JoinArrayUtil.replaceColumn = replaceColumn;
})(JoinArrayUtil = exports.JoinArrayUtil || (exports.JoinArrayUtil = {}));
//# sourceMappingURL=join-array.js.map