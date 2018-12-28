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
//# sourceMappingURL=primitive-expr.js.map