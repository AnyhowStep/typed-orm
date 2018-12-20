"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CaseUtil = require("./util");
class Case {
    constructor(data, queryTree) {
        this.usedRef = data.usedRef;
        this.value = data.value;
        this.result = data.result;
        this.queryTree = queryTree;
    }
    when(whenExpr, thenExpr) {
        return CaseUtil.when(this, whenExpr, thenExpr);
    }
    nullableWhen(whenExpr, thenExpr) {
        return CaseUtil.nullableWhen(this, whenExpr, thenExpr);
    }
    else(elseExpr) {
        return CaseUtil.else(this, elseExpr);
    }
    nullableElse(elseExpr) {
        return CaseUtil.nullableElse(this, elseExpr);
    }
    ;
    end() {
        return CaseUtil.end(this);
    }
}
exports.Case = Case;
//# sourceMappingURL=case.js.map