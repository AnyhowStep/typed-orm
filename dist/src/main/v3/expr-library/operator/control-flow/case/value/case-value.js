"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CaseValueUtil = require("./util");
class CaseValue {
    constructor(data, queryTree) {
        this.usedColumns = data.usedColumns;
        this.value = data.value;
        this.result = data.result;
        this.queryTree = queryTree;
    }
    when(whenExpr, thenExpr) {
        return CaseValueUtil.when(this, whenExpr, thenExpr);
    }
    nullableWhen(whenExpr, thenExpr) {
        return CaseValueUtil.nullableWhen(this, whenExpr, thenExpr);
    }
    else(elseExpr) {
        return CaseValueUtil.else(this, elseExpr);
    }
    nullableElse(elseExpr) {
        return CaseValueUtil.nullableElse(this, elseExpr);
    }
    ;
    end() {
        return CaseValueUtil.end(this);
    }
}
exports.CaseValue = CaseValue;
//# sourceMappingURL=case-value.js.map