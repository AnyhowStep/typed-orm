"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliased_table_1 = require("../../../aliased-table");
const column_map_1 = require("../../../column-map");
function as({ usedColumns, columns, unaliasedQuery, }, newAlias) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns2 = columns;
    return new aliased_table_1.AliasedTable({
        usedColumns,
        alias: newAlias,
        columns: column_map_1.ColumnMapUtil.withTableAlias(columns2, newAlias),
    }, { unaliasedQuery });
}
exports.as = as;
//# sourceMappingURL=as.js.map