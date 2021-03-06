"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("enum-util");
var JoinType;
(function (JoinType) {
    JoinType["FROM"] = "FROM";
    JoinType["INNER"] = "INNER";
    JoinType["LEFT"] = "LEFT";
    JoinType["RIGHT"] = "RIGHT";
    JoinType["CROSS"] = "CROSS";
})(JoinType = exports.JoinType || (exports.JoinType = {}));
;
exports.JoinTypeUtil = new e.WrappedEnum(JoinType);
class Join {
    constructor(data, joinType, from, to) {
        this.aliasedTable = data.aliasedTable;
        this.columns = data.columns;
        this.nullable = data.nullable;
        this.joinType = joinType;
        this.from = from;
        this.to = to;
    }
}
exports.Join = Join;
//# sourceMappingURL=join.js.map