"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
function fromTable(table) {
    const { usedColumns, alias, columns, autoIncrement, id, primaryKey, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
    return new table_1.Table({
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
    }, {
        unaliasedQuery,
    });
}
exports.fromTable = fromTable;
//# sourceMappingURL=from-table.js.map