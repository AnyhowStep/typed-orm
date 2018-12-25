"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("../../../join");
const join_declaration_1 = require("../../join-declaration");
const column_map_1 = require("../../../column-map");
function innerJoin(fromTable, toTable, fromDelegate, toDelegate) {
    const fromColumns = fromDelegate(fromTable.columns);
    if (!(fromColumns instanceof Array) || fromColumns.length == 0) {
        throw new Error(`Expected JOIN to have at least one column for ON clause`);
    }
    column_map_1.ColumnMapUtil.assertHasColumnIdentifiers(fromTable.columns, fromColumns);
    const toColumns = toDelegate(toTable.columns);
    if (!(toColumns instanceof Array) || fromColumns.length != toColumns.length) {
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