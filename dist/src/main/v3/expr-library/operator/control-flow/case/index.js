"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../../raw-expr");
const value_1 = require("./value");
__export(require("./value"));
function CaseConstructor(valueExpr) {
    return new value_1.Case({
        usedRef: raw_expr_1.RawExprUtil.usedRef(valueExpr),
        value: raw_expr_1.RawExprUtil.assertDelegate(valueExpr),
        result: undefined,
    }, [
        "CASE",
        raw_expr_1.RawExprUtil.queryTree(valueExpr),
    ]);
}
exports.CaseConstructor = CaseConstructor;
exports.case = CaseConstructor;
//# sourceMappingURL=index.js.map