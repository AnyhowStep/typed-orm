"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../../../raw-expr");
const condition_1 = require("./condition");
const value_1 = require("./value");
__export(require("./condition"));
__export(require("./value"));
//https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#operator_case
function CaseConditionConstructor() {
    return new condition_1.CaseCondition({
        usedRef: {},
        result: undefined,
    }, [
        "CASE",
    ]);
}
//https://dev.mysql.com/doc/refman/8.0/en/control-flow-functions.html#operator_case
function CaseValueConstructor(valueExpr) {
    return new value_1.CaseValue({
        usedRef: raw_expr_1.RawExprUtil.usedRef(valueExpr),
        value: raw_expr_1.RawExprUtil.assertDelegate(valueExpr),
        result: undefined,
    }, [
        "CASE",
        raw_expr_1.RawExprUtil.queryTree(valueExpr),
    ]);
}
function CaseConstructor(arg0) {
    if (arg0 == undefined) {
        return CaseConditionConstructor();
    }
    else {
        return CaseValueConstructor(arg0);
    }
}
exports.CaseConstructor = CaseConstructor;
exports.case = CaseConstructor;
//# sourceMappingURL=index.js.map