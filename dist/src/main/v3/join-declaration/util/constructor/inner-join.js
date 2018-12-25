"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../../join");
const join_declaration_1 = require("../../join-declaration");
const column_map_1 = require("../../../column-map");
const column_1 = require("../../../column");
function innerJoin(fromTable, toTable, fromDelegate, toDelegate) {
    if (fromTable.alias == toTable.alias) {
        throw new Error(`Cannot join two tables with the same name`);
    }
    const fromColumns = fromDelegate(fromTable.columns);
    column_1.ColumnUtil.Array.assertIsColumnArray(fromColumns);
    if (fromColumns.length == 0) {
        throw new Error(`Expected JOIN to have at least one column for ON clause`);
    }
    column_map_1.ColumnMapUtil.assertHasColumnIdentifiers(fromTable.columns, fromColumns);
    const toColumns = toDelegate(toTable.columns);
    column_1.ColumnUtil.Array.assertIsColumnArray(toColumns);
    if (fromColumns.length != toColumns.length) {
        throw new Error(`Expected JOIN to have ${fromColumns.length} target columns`);
    }
    column_map_1.ColumnMapUtil.assertHasColumnIdentifiers(toTable.columns, toColumns);
    return new join_declaration_1.JoinDeclaration({
        fromTable,
        toTable,
        nullable: false,
    }, join_1.JoinType.INNER, fromColumns, toColumns);
}
exports.innerJoin = innerJoin;
//# sourceMappingURL=inner-join.js.map