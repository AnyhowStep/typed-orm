"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const column_map_1 = require("../../../column-map");
const string_array_1 = require("../../../string-array");
function setMutable(table, delegate) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const mutableColumns = delegate(columns);
    for (let mutableColumn of mutableColumns) {
        if (table.generated.indexOf(mutableColumn.name) >= 0) {
            throw new Error(`Column ${table.alias}.${mutableColumn.name} is generated and cannot be mutable`);
        }
        column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, mutableColumn);
    }
    //TODO-FEATURE Make other arrays of strings always
    //have unique elements?
    const mutable = (string_array_1.StringArrayUtil.uniqueString(mutableColumns.map(column => column.name)));
    const { usedRef, alias, autoIncrement, id, primaryKey, candidateKeys, generated, isNullable, hasExplicitDefaultValue, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
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
exports.setMutable = setMutable;
//# sourceMappingURL=set-mutable.js.map