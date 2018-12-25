"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
function disallowInsert(table) {
    const { usedRef, alias, columns, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, deleteAllowed, unaliasedQuery, } = table;
    return new table_1.Table({
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
        insertAllowed: false,
        deleteAllowed,
    }, { unaliasedQuery });
}
exports.disallowInsert = disallowInsert;
//# sourceMappingURL=disallow-insert.js.map