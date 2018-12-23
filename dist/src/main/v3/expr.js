"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("./raw-expr");
const query_tree_1 = require("./query-tree");
const constants_1 = require("./constants");
class Expr {
    constructor(data, queryTree) {
        this.usedRef = data.usedRef;
        this.assertDelegate = data.assertDelegate;
        //Gotta' play it safe.
        //We want to preserve the order of operations.
        this.queryTree = query_tree_1.Parentheses.Create(queryTree);
    }
    as(alias) {
        return ExprUtil.as(this, alias);
    }
}
exports.Expr = Expr;
var ExprUtil;
(function (ExprUtil) {
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
    ExprUtil.isExpr = isExpr;
    function fromRawExpr(rawExpr) {
        if (rawExpr instanceof Expr) {
            return rawExpr;
        }
        const usedRef = raw_expr_1.RawExprUtil.usedRef(rawExpr);
        const assertDelegate = raw_expr_1.RawExprUtil.assertDelegate(rawExpr);
        const queryTree = raw_expr_1.RawExprUtil.queryTree(rawExpr);
        return new Expr({
            usedRef,
            assertDelegate,
        }, queryTree);
    }
    ExprUtil.fromRawExpr = fromRawExpr;
    function as(expr, alias) {
        const result = new Expr(expr, expr.queryTree);
        result.tableAlias = constants_1.ALIASED;
        result.alias = alias;
        result.unaliasedQuery = expr.queryTree;
        return result;
    }
    ExprUtil.as = as;
})(ExprUtil = exports.ExprUtil || (exports.ExprUtil = {}));
//# sourceMappingURL=expr.js.map