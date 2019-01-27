"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
//https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_elt
function elt(n, arg0, ...args) {
    const result = new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            n,
            arg0,
            ...args,
        ]),
        assertDelegate: sd.nullable(sd.string()),
    }, new query_tree_1.FunctionCall("ELT", [
        raw_expr_1.RawExprUtil.queryTree(n),
        raw_expr_1.RawExprUtil.queryTree(arg0),
        ...args.map(raw_expr_1.RawExprUtil.queryTree)
    ]));
    return result;
}
exports.elt = elt;
//# sourceMappingURL=elt.js.map