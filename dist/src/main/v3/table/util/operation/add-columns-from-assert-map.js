"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const column_map_1 = require("../../../column-map");
const column_1 = require("../../../column");
function addColumnsFromAssertMap(table, assertMap) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const tableColumns = table.columns;
    const columns = column_map_1.ColumnMapUtil.intersect(tableColumns, column_map_1.ColumnMapUtil.fromAssertMap(table.alias, assertMap));
    const isNullable = column_1.ColumnUtil.Name.Array.nullableFromColumnMap(columns);
    const { usedRef, alias, autoIncrement, id, candidateKeys, generated, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
    const result = new table_1.Table({
        usedRef,
        alias,
        columns,
        autoIncrement,
        id,
        candidateKeys,
        generated,
        isNullable,
        hasExplicitDefaultValue,
        mutable,
        parents,
        insertAllowed,
        deleteAllowed,
    }, { unaliasedQuery });
    return result;
}
exports.addColumnsFromAssertMap = addColumnsFromAssertMap;
//# sourceMappingURL=add-columns-from-assert-map.js.map