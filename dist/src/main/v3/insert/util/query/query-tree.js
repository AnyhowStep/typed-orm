"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const table_1 = require("../../../table");
const insert_1 = require("../../insert");
const raw_expr_1 = require("../../../raw-expr");
function queryTreeRow(insert, row) {
    const columnNames = Object.keys(insert._table.columns).sort();
    const result = [];
    for (let columnName of columnNames) {
        if (result.length > 0) {
            result.push(",");
        }
        const value = row[columnName];
        if (value === undefined) {
            if (table_1.TableUtil.isRequired(insert._table, columnName)) {
                throw new Error(`Expected a value for ${insert._table.alias}.${columnName}; received undefined`);
            }
            else {
                result.push("DEFAULT");
            }
        }
        else {
            result.push(raw_expr_1.RawExprUtil.queryTree(value));
        }
    }
    return [
        "(",
        result,
        ")"
    ];
}
exports.queryTreeRow = queryTreeRow;
function queryTreeValues(insert) {
    const result = [];
    for (let row of insert._values) {
        if (result.length > 0) {
            result.push(",");
        }
        result.push(queryTreeRow(insert, row));
    }
    return result;
}
exports.queryTreeValues = queryTreeValues;
function queryTree(insert) {
    const columnNames = Object.keys(insert._table.columns).sort();
    const result = [];
    if (insert._modifier == insert_1.InsertModifier.IGNORE) {
        result.push("INSERT IGNORE INTO");
    }
    else if (insert._modifier == insert_1.InsertModifier.REPLACE) {
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
    result.push("VALUES");
    result.push(queryTreeValues(insert));
    return result;
}
exports.queryTree = queryTree;
//# sourceMappingURL=query-tree.js.map