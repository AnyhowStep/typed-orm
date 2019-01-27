"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
function rand(seed) {
    if (seed === undefined) {
        return new expr_1.Expr({
            usedColumns: [],
            assertDelegate: dataType.double(),
        }, new query_tree_1.FunctionCall("RAND", []));
    }
    else {
        return new expr_1.Expr({
            usedColumns: raw_expr_1.RawExprUtil.usedColumns(seed),
            assertDelegate: dataType.double(),
        }, new query_tree_1.FunctionCall("RAND", [
            raw_expr_1.RawExprUtil.queryTree(seed)
        ]));
    }
}
exports.rand = rand;
//# sourceMappingURL=rand.js.map