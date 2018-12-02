"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("./aliased-table");
const column_map_1 = require("./column-map");
const column_array_1 = require("./column-array");
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
(function (Join) {
    function isJoin(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("aliasedTable" in raw) &&
            ("columns" in raw) &&
            ("nullable" in raw) &&
            ("joinType" in raw) &&
            ("from" in raw) &&
            ("to" in raw) &&
            aliased_table_1.AliasedTable.isAliasedTable(raw.aliasedTable) &&
            column_map_1.ColumnMapUtil.isColumnMap(raw.columns) &&
            (typeof raw.nullable == "boolean") &&
            exports.JoinTypeUtil.isValue(raw.joinType) &&
            column_array_1.ColumnArrayUtil.isColumnArray(raw.from) &&
            column_array_1.ColumnArrayUtil.isColumnArray(raw.to));
    }
    Join.isJoin = isJoin;
})(Join = exports.Join || (exports.Join = {}));
//# sourceMappingURL=join.js.map