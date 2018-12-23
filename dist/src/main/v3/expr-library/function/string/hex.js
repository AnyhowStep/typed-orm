"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_hex
//TODO-DEBATE Debate if number should not be allowed?
//For a numeric argument N,
//HEX() returns a hexadecimal string representation
//of the value of N treated as a longlong (BIGINT) number.
//NOTE: HEX('') gives you an empty string!
function hex(rawExpr) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: sd.match(/^[0-9A-F]*$/, name => `${name} must be a hexadecimal string, with uppercase A-F`),
    }, new query_tree_1.FunctionCall("HEX", [
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]));
    return result;
}
exports.hex = hex;
//# sourceMappingURL=hex.js.map