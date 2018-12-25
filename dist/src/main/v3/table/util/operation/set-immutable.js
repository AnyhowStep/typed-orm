"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../table");
function setImmutable(table) {
    const { usedRef, alias, columns, autoIncrement, id, candidateKeys, generated, isNullable, hasExplicitDefaultValue, parents, insertAllowed, deleteAllowed, unaliasedQuery, } = table;
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
        mutable: [],
        parents,
        insertAllowed,
        deleteAllowed,
    }, { unaliasedQuery });
}
exports.setImmutable = setImmutable;
//# sourceMappingURL=set-immutable.js.map