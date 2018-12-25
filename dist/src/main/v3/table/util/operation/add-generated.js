"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
const column_map_1 = require("../../../column-map");
const string_array_1 = require("../../../string-array");
function addGenerated(table, delegate) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns = table.columns;
    //https://github.com/Microsoft/TypeScript/issues/24277
    const generatedColumns = delegate(columns);
    for (let generatedColumn of generatedColumns) {
        if (table.generated.indexOf(generatedColumn.name) >= 0) {
            throw new Error(`Column ${table.alias}.${generatedColumn.name} already declared generated`);
        }
        column_map_1.ColumnMapUtil.assertHasColumnIdentifier(table.columns, generatedColumn);
    }
    const generated = string_array_1.StringArrayUtil.uniqueString([
        ...table.generated,
        ...generatedColumns.map(column => column.name),
    ]);
    const hasExplicitDefaultValue = string_array_1.StringArrayUtil.uniqueString([
        ...table.hasExplicitDefaultValue,
        ...generatedColumns.map(column => column.name),
    ]);
    const mutable = string_array_1.StringArrayUtil.uniqueString(table.mutable.filter((columnName) => {
        return generatedColumns.every(column => column.name != columnName);
    }));
    const { usedRef, alias, autoIncrement, id, primaryKey, candidateKeys, isNullable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
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
exports.addGenerated = addGenerated;
//# sourceMappingURL=add-generated.js.map