"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const tables_1 = require("../tables");
const exprLib = require("../../expr-library");
function tableExists(connection, tableName) {
    return query_1.QueryUtil.newInstance()
        .from(tables_1.TABLES)
        .where(c => exprLib.nullSafeEq(c.TABLE_SCHEMA, exprLib.database()))
        .whereEq(c => c.TABLE_NAME, tableName)
        .exists(connection);
}
exports.tableExists = tableExists;
//# sourceMappingURL=table-exists.js.map