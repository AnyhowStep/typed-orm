"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("./raw-expr");
const query_tree_1 = require("./query-tree");
class Expr {
    constructor(data, queryTree) {
        this.usedRef = data.usedRef;
        this.assertDelegate = data.assertDelegate;
        this.queryTree = queryTree;
    }
}
exports.Expr = Expr;
(function (Expr) {
    function isExpr(raw) {
        return ((raw != undefined) &&
            (raw instanceof Object) &&
            ("usedRef" in raw) &&
            ("assertDelegate" in raw) &&
            ("queryTree" in raw) &&
            (raw.usedRef instanceof Object) &&
            (typeof raw.assertDelegate == "function") &&
            (query_tree_1.QueryTreeUtil.isQueryTree(raw.queryTree)));
    }
    Expr.isExpr = isExpr;
    function fromRawExpr(rawExpr) {
        const usedRef = raw_expr_1.RawExprUtil.usedRef(rawExpr);
        const assertDelegate = raw_expr_1.RawExprUtil.assertDelegate(rawExpr);
        const queryTree = raw_expr_1.RawExprUtil.queryTree(rawExpr);
        return new Expr({
            usedRef,
            assertDelegate,
        }, queryTree);
    }
    Expr.fromRawExpr = fromRawExpr;
})(Expr = exports.Expr || (exports.Expr = {}));
//# sourceMappingURL=expr.js.map