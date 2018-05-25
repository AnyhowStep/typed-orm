"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_1 = require("./column");
var ColumnUtil;
(function (ColumnUtil) {
    function toNullable(column) {
        return new column_1.Column(column.tableAlias, column.name, sd.or(sd.nil(), column.assertDelegate), column.subTableName, column.isSelectReference);
    }
    ColumnUtil.toNullable = toNullable;
    function withTableAlias(column, newTableAlias) {
        return new column_1.Column(newTableAlias, column.name, column.assertDelegate, column.subTableName, column.isSelectReference);
    }
    ColumnUtil.withTableAlias = withTableAlias;
    function withType(column, assertDelegate) {
        return new column_1.Column(column.tableAlias, column.name, assertDelegate, column.subTableName, column.isSelectReference);
    }
    ColumnUtil.withType = withType;
})(ColumnUtil = exports.ColumnUtil || (exports.ColumnUtil = {}));
//# sourceMappingURL=util.js.map