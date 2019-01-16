"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../join");
const aliased_table_1 = require("../../../aliased-table");
const column_map_1 = require("../../../column-map");
const column_1 = require("../../../column");
function isJoin(raw) {
    return (raw != undefined &&
        (raw instanceof Object) &&
        ("aliasedTable" in raw) &&
        ("columns" in raw) &&
        ("nullable" in raw) &&
        ("joinType" in raw) &&
        ("from" in raw) &&
        ("to" in raw) &&
        aliased_table_1.AliasedTableUtil.isAliasedTable(raw.aliasedTable) &&
        column_map_1.ColumnMapUtil.isColumnMap(raw.columns) &&
        (typeof raw.nullable == "boolean") &&
        join_1.JoinTypeUtil.isValue(raw.joinType) &&
        column_1.ColumnUtil.Array.isColumnArray(raw.from) &&
        column_1.ColumnUtil.Array.isColumnArray(raw.to));
}
exports.isJoin = isJoin;
//# sourceMappingURL=is-join.js.map