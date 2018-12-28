"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const sqlstring_1 = require("sqlstring");
const table_1 = require("../../../table");
const insert_select_1 = require("../../insert-select");
const raw_expr_1 = require("../../../raw-expr");
const query_1 = require("../../../query");
const primitive_expr_1 = require("../../../primitive-expr");
const util_1 = require("../../../column/util");
const constants_1 = require("../../../constants");
//TODO-REFACTOR
function queryTree(insert) {
    const columnNames = Object.keys(insert._table.columns).sort()
        .filter(columnName => insert._table.generated.indexOf(columnName) < 0)
        .filter(columnName => {
        if (insert._row[columnName] !== undefined) {
            return true;
        }
        if (table_1.TableUtil.isRequired(insert._table, columnName)) {
            throw new Error(`A value for ${insert._table.alias}.${columnName} is required`);
        }
        return false;
    });
    const result = [];
    if (insert._modifier == insert_select_1.InsertSelectModifier.IGNORE) {
        result.push("INSERT IGNORE INTO");
    }
    else if (insert._modifier == insert_select_1.InsertSelectModifier.REPLACE) {
        result.push("REPLACE INTO");
    }
    else {
        result.push("INSERT INTO");
    }
    result.push(sqlstring_1.escapeId(insert._table.alias));
    result.push("(");
    result.push(columnNames
        .map(columnName => sqlstring_1.escapeId(columnName))
        .join(","));
    result.push(")");
    result.push("SELECT");
    result.push(columnNames
        .map((columnName, index) => {
        const expr = insert._row[columnName];
        const innerResult = (index == 0) ?
            [] :
            [","];
        if (primitive_expr_1.isPrimitiveExpr(expr)) {
            innerResult.push(raw_expr_1.RawExprUtil.queryTree(expr));
        }
        else if (util_1.isColumn(expr)) {
            innerResult.push(sqlstring_1.escapeId("src"));
            innerResult.push(".");
            innerResult.push(sqlstring_1.escapeId(`${expr.tableAlias}${constants_1.SEPARATOR}${expr.name}`));
        }
        else {
            throw new Error(`Unknown INSERT ... SELECT value, ${sd.toTypeStr(expr)}`);
        }
        return innerResult;
    }));
    result.push("FROM");
    result.push("(");
    result.push(query_1.QueryUtil.queryTree(insert._query));
    result.push(")");
    result.push("AS");
    result.push(sqlstring_1.escapeId("src"));
    return result;
}
exports.queryTree = queryTree;
//# sourceMappingURL=query-tree.js.map