"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const columns_1 = require("../columns");
const exprLib = require("../../expr-library");
function fetchColumnsOfTable(connection, tableName) {
    return query_1.QueryUtil.newInstance()
        .from(columns_1.COLUMNS)
        .where(c => exprLib.nullSafeEq(c.TABLE_SCHEMA, exprLib.database()))
        .where(c => exprLib.eq(c.TABLE_NAME, tableName))
        .orderBy(c => [
        c.ORDINAL_POSITION.asc()
    ])
        .select(c => [
        c
        /*c.COLUMN_NAME,
        c.ORDINAL_POSITION,
        c.IS_NULLABLE,
        c.COLUMN_DEFAULT,
        c.GENERATION_EXPRESSION,
        c.EXTRA*/
    ])
        .fetchAll(connection);
}
exports.fetchColumnsOfTable = fetchColumnsOfTable;
//# sourceMappingURL=fetch-columns-of-table.js.map