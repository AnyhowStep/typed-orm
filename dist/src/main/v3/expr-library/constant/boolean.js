"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../expr");
let trueCache = undefined;
let falseCache = undefined;
function getTrue() {
    if (trueCache == undefined) {
        trueCache = expr_1.ExprUtil.fromRawExpr(true);
    }
    return trueCache;
}
exports.true = getTrue;
function getFalse() {
    if (falseCache == undefined) {
        falseCache = expr_1.ExprUtil.fromRawExpr(false);
    }
    return falseCache;
}
exports.false = getFalse;
//# sourceMappingURL=boolean.js.map