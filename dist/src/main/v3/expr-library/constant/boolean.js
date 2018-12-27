"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../expr");
let trueCache = undefined;
let falseCache = undefined;
function trueLiteral() {
    if (trueCache == undefined) {
        trueCache = expr_1.ExprUtil.fromRawExpr(true);
    }
    return trueCache;
}
exports.trueLiteral = trueLiteral;
function getFalse() {
    if (falseCache == undefined) {
        falseCache = expr_1.ExprUtil.fromRawExpr(false);
    }
    return falseCache;
}
exports.falseLiteral = getFalse;
//# sourceMappingURL=boolean.js.map