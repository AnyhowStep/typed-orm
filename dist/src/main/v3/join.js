"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("./aliased-table");
const column_map_1 = require("./column-map");
const column_1 = require("./column");
const e = require("enum-util");
const column_identifier_map_1 = require("./column-identifier-map");
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
            column_1.ColumnUtil.Array.isColumnArray(raw.from) &&
            column_1.ColumnUtil.Array.isColumnArray(raw.to));
    }
    Join.isJoin = isJoin;
    function toNullable(join) {
        const { aliasedTable, columns, } = join;
        const result = new Join({
            aliasedTable,
            columns,
            nullable: true,
        }, join.joinType, join.from, join.to);
        return result;
    }
    Join.toNullable = toNullable;
    function replaceColumn(join, column) {
        if (!column_identifier_map_1.ColumnIdentifierMapUtil.hasColumnIdentifier(join.columns, column)) {
            return join;
        }
        const columns = {};
        for (let columnName in join.columns) {
            if (columnName == column.name) {
                columns[columnName] = column;
            }
            else {
                columns[columnName] = join.columns[columnName];
            }
        }
        return new Join({
            aliasedTable: join.aliasedTable,
            columns: columns,
            nullable: join.nullable,
        }, join.joinType, join.from, join.to);
    }
    Join.replaceColumn = replaceColumn;
})(Join = exports.Join || (exports.Join = {}));
//# sourceMappingURL=join.js.map