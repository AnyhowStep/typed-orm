"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const table_1 = require("../../table");
const column_map_1 = require("../../../column-map");
function setAlias(table, newAlias) {
    //https://github.com/Microsoft/TypeScript/issues/28592
    const columns = table.columns;
    const { usedRef, autoIncrement, id, primaryKey, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, } = table;
    return new table_1.Table({
        usedRef,
        alias: newAlias,
        columns: column_map_1.ColumnMapUtil.withTableAlias(columns, newAlias),
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
    }, {
        unaliasedQuery: sqlstring_1.escapeId(newAlias),
    });
}
exports.setAlias = setAlias;
//# sourceMappingURL=set-alias.js.map