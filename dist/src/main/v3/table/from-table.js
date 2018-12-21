"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./table");
function tableFromTable(table) {
    const { usedRef, alias, columns, autoIncrement, generated, isNullable, hasExplicitDefaultValue, mutable, id, candidateKeys, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
    return new table_1.Table({
        usedRef,
        alias,
        columns,
        autoIncrement,
        generated,
        isNullable,
        hasExplicitDefaultValue,
        mutable,
        id,
        candidateKeys,
        parents,
        insertAllowed,
        deleteAllowed,
    }, {
        unaliasedQuery,
    });
}
exports.tableFromTable = tableFromTable;
//# sourceMappingURL=from-table.js.map