"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./table");
function tableFromTable(table) {
    const { alias, name, columns, autoIncrement, generated, hasDefaultValue, mutable, id, candidateKeys, parents, insertAllowed, deleteAllowed, } = table;
    return new table_1.Table({
        alias,
        name,
        columns,
        autoIncrement,
        generated,
        hasDefaultValue,
        mutable,
        id,
        candidateKeys,
        parents,
        insertAllowed,
        deleteAllowed,
    }, table.__databaseName);
}
exports.tableFromTable = tableFromTable;
//# sourceMappingURL=from-table.js.map