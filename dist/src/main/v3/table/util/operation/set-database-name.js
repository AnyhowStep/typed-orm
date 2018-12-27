"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const table_1 = require("../../table");
function setDatabaseName(table, newDatabaseName) {
    const { usedRef, alias, columns, autoIncrement, id, primaryKey, candidateKeys, generated, isNullable, hasExplicitDefaultValue, mutable, parents, insertAllowed, deleteAllowed, } = table;
    return new table_1.Table({
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
    }, {
        unaliasedQuery: [
            sqlstring_1.escapeId(newDatabaseName),
            ".",
            sqlstring_1.escapeId(alias),
        ],
    });
}
exports.setDatabaseName = setDatabaseName;
//# sourceMappingURL=set-database-name.js.map