"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("./table");
function tableFromTable(table) {
    return new table_1.Table(table, table.__databaseName);
}
exports.tableFromTable = tableFromTable;
//# sourceMappingURL=from-table.js.map