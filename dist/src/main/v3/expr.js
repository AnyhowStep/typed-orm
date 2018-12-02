"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("./raw-expr");
const query_string_tree_1 = require("./query-string-tree");
class Expr {
    constructor(data, queryStringTree) {
        this.usedRef = data.usedRef;
        this.assertDelegate = data.assertDelegate;
        this.queryStringTree = queryStringTree;
    }
}
exports.Expr = Expr;
(function (Expr) {
    function isExpr(raw) {
        return ((raw != undefined) &&
            (raw instanceof Object) &&
            ("usedRef" in raw) &&
            ("assertDelegate" in raw) &&
            ("queryStringTree" in raw) &&
            (raw.usedRef instanceof Object) &&
            (typeof raw.assertDelegate == "function") &&
            (query_string_tree_1.QueryStringTreeUtil.isQueryStringTree(raw.queryStringTree)));
    }
    Expr.isExpr = isExpr;
    function fromRawExpr(rawExpr) {
        const usedRef = raw_expr_1.RawExprUtil.usedRef(rawExpr);
        const assertDelegate = raw_expr_1.RawExprUtil.assertDelegate(rawExpr);
        const queryStringTree = raw_expr_1.RawExprUtil.queryStringTree(rawExpr);
        return new Expr({
            usedRef,
            assertDelegate,
        }, queryStringTree);
    }
    Expr.fromRawExpr = fromRawExpr;
})(Expr = exports.Expr || (exports.Expr = {}));
//# sourceMappingURL=expr.js.map