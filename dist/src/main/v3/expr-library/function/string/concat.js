"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_concat
//TODO-FEATURE Add support for Buffer
//If all arguments are nonbinary strings, the result is a nonbinary string.
//If the arguments include any binary strings, the result is a binary string.
function concat(arg0, ...args) {
    const result = new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            arg0,
            ...args,
        ]),
        assertDelegate: sd.string(),
    }, new query_tree_1.FunctionCall("CONCAT", [
        raw_expr_1.RawExprUtil.queryTree(arg0),
        ...args.map(raw_expr_1.RawExprUtil.queryTree)
    ]));
    return result;
}
exports.concat = concat;
//# sourceMappingURL=concat.js.map