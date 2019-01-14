"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const tables_1 = require("../tables");
const exprLib = require("../../expr-library");
function fetchTablesOfCurrentDatabase(connection) {
    return query_1.QueryUtil.newInstance()
        .from(tables_1.TABLES)
        .where(c => exprLib.nullSafeEq(c.TABLE_SCHEMA, exprLib.database()))
        .orderBy(c => [
        c.TABLE_NAME.asc()
    ])
        .select(c => [c])
        .fetchAll(connection);
}
exports.fetchTablesOfCurrentDatabase = fetchTablesOfCurrentDatabase;
//# sourceMappingURL=fetch-tables-of-current-database.js.map