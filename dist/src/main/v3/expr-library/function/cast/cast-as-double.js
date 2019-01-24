"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const dataType = require("../../../data-type");
const query_tree_1 = require("../../../query-tree");
//We don't have CAST(x AS DOUBLE) so we use a hack.
//(x + 0e0) will give us a DOUBLE
function castAsDouble(rawExpr) {
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: dataType.double(),
    }, query_tree_1.Parentheses.Create([
        raw_expr_1.RawExprUtil.queryTree(rawExpr),
        "+",
        "0e0"
    ]));
}
exports.castAsDouble = castAsDouble;
//# sourceMappingURL=cast-as-double.js.map