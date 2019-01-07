"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const column_map_1 = require("../../../column-map");
function addColumnsFromAssertMap(table, assertMap) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const tableColumns = table.columns;
    const columns = column_map_1.ColumnMapUtil.intersect(tableColumns, column_map_1.ColumnMapUtil.fromAssertMap(table.alias, assertMap));
    const isNullable = column_map_1.ColumnMapUtil.nullableColumnNames(columns);
    const { usedRef, alias, autoIncrement, id, primaryKey, candidateKeys, generated, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
    const result = new table_1.Table({
        usedRef,
        alias,
        columns,
        autoIncrement,
        id,
        primaryKey,
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