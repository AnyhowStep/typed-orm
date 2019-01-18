"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const tables_1 = require("../tables");
const exprLib = require("../../expr-library");
function fetchAutoIncrementOfTable(connection, tableName) {
    return query_1.QueryUtil.newInstance()
        .from(tables_1.TABLES)
        .where(c => exprLib.nullSafeEq(c.TABLE_SCHEMA, exprLib.database()))
        .whereEq(c => c.TABLE_NAME, tableName)
        .select(c => [
        c.AUTO_INCREMENT
    ])
        .fetchValue(connection);
}
exports.fetchAutoIncrementOfTable = fetchAutoIncrementOfTable;
//# sourceMappingURL=fetch-auto-increment-of-table.js.map