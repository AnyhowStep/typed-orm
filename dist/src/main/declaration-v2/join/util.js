"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("./join");
const column_collection_1 = require("../column-collection");
var JoinUtil;
(function (JoinUtil) {
    function toNullable(join) {
        return new join_1.Join(join.joinType, join.table, join.columns, true, join.from, join.to);
    }
    JoinUtil.toNullable = toNullable;
    function replaceColumnType(join, tableAlias, columnName, newAssertDelegate) {
        if (join.table.alias == tableAlias) {
            return new join_1.Join(join.joinType, join.table, column_collection_1.ColumnCollectionUtil.replaceColumnType(join.columns, tableAlias, columnName, newAssertDelegate), join.nullable, join.from, join.to);
        }
        else {
            return join;
        }
    }
    JoinUtil.replaceColumnType = replaceColumnType;
})(JoinUtil = exports.JoinUtil || (exports.JoinUtil = {}));
//# sourceMappingURL=util.js.map