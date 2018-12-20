"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
function coalesce(...args) {
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(...args),
        assertDelegate: sd.or(...args.map((arg, index) => {
            if (index == args.length - 1) {
                return raw_expr_1.RawExprUtil.assertDelegate(arg);
            }
            else {
                return sd.notNullable(raw_expr_1.RawExprUtil.assertDelegate(arg));
            }
        })),
    }, new query_tree_1.FunctionCall("COALESCE", args.map(raw_expr_1.RawExprUtil.queryTree)));
}
exports.coalesce = coalesce;
//# sourceMappingURL=coalesce.js.map