"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
function disallowDelete(table) {
    const { usedColumns, alias, columns, autoIncrement, id, primaryKey, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, unaliasedQuery, } = table;
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
        deleteAllowed: false,
    }, { unaliasedQuery });
}
exports.disallowDelete = disallowDelete;
//# sourceMappingURL=disallow-delete.js.map