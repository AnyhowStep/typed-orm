"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CaseConditionUtil = require("./util");
class CaseCondition {
    constructor(data, queryTree) {
        this.usedColumns = data.usedColumns;
        this.result = data.result;
        this.queryTree = queryTree;
    }
    when(whenExpr, thenExpr) {
        return CaseConditionUtil.when(this, whenExpr, thenExpr);
    }
    nullableWhen(whenExpr, thenExpr) {
        return CaseConditionUtil.nullableWhen(this, whenExpr, thenExpr);
    }
    else(elseExpr) {
        return CaseConditionUtil.else(this, elseExpr);
    }
    nullableElse(elseExpr) {
        return CaseConditionUtil.nullableElse(this, elseExpr);
    }
    ;
    end() {
        return CaseConditionUtil.end(this);
    }
}
exports.CaseCondition = CaseCondition;
//# sourceMappingURL=case-condition.js.map