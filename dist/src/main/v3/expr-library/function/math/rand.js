"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
function rand(seed) {
    if (seed === undefined) {
        return new expr_1.Expr({
            usedRef: {},
            assertDelegate: sd.number(),
        }, new query_tree_1.FunctionCall("RAND", []));
    }
    else {
        return new expr_1.Expr({
            usedRef: raw_expr_1.RawExprUtil.usedRef(seed),
            assertDelegate: sd.number(),
        }, new query_tree_1.FunctionCall("RAND", [
            raw_expr_1.RawExprUtil.queryTree(seed)
        ]));
    }
}
exports.rand = rand;
//# sourceMappingURL=rand.js.map