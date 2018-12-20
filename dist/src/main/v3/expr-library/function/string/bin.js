"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_bin
//TODO Debate if should only allow bigint?
//Returns a string representation of the binary value of N,
//where N is a longlong (BIGINT) number.
//This is equivalent to CONV(N,10,2).
//Returns NULL if N is NULL.
function bin(rawExpr) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: sd.match(/^(1|0)+$/, name => `${name} must be a non-empty binary string`),
    }, new query_tree_1.FunctionCall("BIN", [
        raw_expr_1.RawExprUtil.queryTree(rawExpr)
    ]));
    return result;
}
exports.bin = bin;
//# sourceMappingURL=bin.js.map