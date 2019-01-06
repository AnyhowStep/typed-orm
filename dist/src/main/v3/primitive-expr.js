"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isPrimitiveExpr(raw) {
    switch (typeof raw) {
        case "bigint":
        case "number":
        case "string":
        case "boolean": {
            return true;
        }
    }
    if (raw instanceof Date) {
        return true;
    }
    if (raw instanceof Buffer) {
        return true;
    }
    if (raw === null) {
        return true;
    }
    return false;
}
exports.isPrimitiveExpr = isPrimitiveExpr;
function isNonNullPrimitiveExpr(raw) {
    if (raw === null) {
        return false;
    }
    return isPrimitiveExpr(raw);
}
exports.isNonNullPrimitiveExpr = isNonNullPrimitiveExpr;
var PrimitiveExprUtil;
(function (PrimitiveExprUtil) {
    function isEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (a instanceof Date) {
            if (b instanceof Date) {
                if (isNaN(a.getTime()) && isNaN(b.getTime())) {
                    return true;
                }
                return a.getTime() === b.getTime();
            }
            else {
                return false;
            }
        }
        if (a instanceof Buffer) {
            if (b instanceof Buffer) {
                return a.equals(b);
            }
            else {
                return false;
            }
        }
        //No idea, assume not equal
        return false;
    }
    PrimitiveExprUtil.isEqual = isEqual;
})(PrimitiveExprUtil = exports.PrimitiveExprUtil || (exports.PrimitiveExprUtil = {}));
//# sourceMappingURL=primitive-expr.js.map