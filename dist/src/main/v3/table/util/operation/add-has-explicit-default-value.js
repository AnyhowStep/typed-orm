"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const column_map_1 = require("../../../column-map");
const string_array_1 = require("../../../string-array");
function addHasExplicitDefaultValue(table, delegate) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const hasExplicitDefaultValueColumns = delegate(columns);
    for (let hasExplicitDefaultValueColumn of hasExplicitDefaultValueColumns) {
        if (table.hasExplicitDefaultValue.indexOf(hasExplicitDefaultValueColumn.name) >= 0) {
            throw new Error(`Column ${table.alias}.${hasExplicitDefaultValueColumn.name} already declared as having a default value`);
        }
        column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, hasExplicitDefaultValueColumn);
    }
    const hasExplicitDefaultValue = string_array_1.StringArrayUtil.uniqueString([
        ...table.hasExplicitDefaultValue,
        ...hasExplicitDefaultValueColumns.map(column => column.name),
    ]);
    const { usedRef, alias, autoIncrement, id, primaryKey, candidateKeys, generated, isNullable, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
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
exports.addHasExplicitDefaultValue = addHasExplicitDefaultValue;
//# sourceMappingURL=add-has-explicit-default-value.js.map