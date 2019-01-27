"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const column_map_1 = require("../../../column-map");
function addColumnsFromFieldTuple(table, fields) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const tableColumns = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columnMapFromFieldArray = column_map_1.ColumnMapUtil.fromFieldArray(table.alias, fields);
    const columns = column_map_1.ColumnMapUtil.intersect(tableColumns, columnMapFromFieldArray);
    const isNullable = column_map_1.ColumnMapUtil.nullableColumnNames(columns);
    const { usedColumns, alias, autoIncrement, id, primaryKey, candidateKeys, generated, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
    const result = new table_1.Table({
        usedColumns,
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
exports.addColumnsFromFieldTuple = addColumnsFromFieldTuple;
//# sourceMappingURL=add-columns-from-field-tuple.js.map