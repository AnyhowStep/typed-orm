"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat-ws
//TODO Add support for Buffer
//If all arguments are nonbinary strings, the result is a nonbinary string.
//If the arguments include any binary strings, the result is a binary string.
function concatWs(separator, arg0, ...args) {
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(separator, arg0, ...args),
        assertDelegate: sd.string(),
    }, new query_tree_1.FunctionCall("CONCAT_WS", [
        raw_expr_1.RawExprUtil.queryTree(separator),
        raw_expr_1.RawExprUtil.queryTree(arg0),
        ...args.map(raw_expr_1.RawExprUtil.queryTree)
    ]));
    return result;
}
exports.concatWs = concatWs;
//# sourceMappingURL=concat-ws.js.map