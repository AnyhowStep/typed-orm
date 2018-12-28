"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const columns_1 = require("../columns");
const exprLib = require("../../expr-library");
function fetchGenerationExpression(connection, column) {
    return query_1.QueryUtil.newInstance()
        .from(columns_1.COLUMNS)
        .select(c => [c.GENERATION_EXPRESSION])
        .where(c => exprLib.nullSafeEq(c.TABLE_SCHEMA, exprLib.database()))
        .whereEq(c => c.TABLE_NAME, column.tableAlias)
        .whereEq(c => c.COLUMN_NAME, column.name)
        .fetchValue(connection);
}
exports.fetchGenerationExpression = fetchGenerationExpression;
//# sourceMappingURL=fetch-generation-expression.js.map