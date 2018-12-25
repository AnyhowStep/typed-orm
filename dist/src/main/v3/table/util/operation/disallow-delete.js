"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
function disallowDelete(table) {
    const { usedRef, alias, columns, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, unaliasedQuery, } = table;
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
        insertAllowed,
        deleteAllowed: false,
    }, { unaliasedQuery });
}
exports.disallowDelete = disallowDelete;
//# sourceMappingURL=disallow-delete.js.map