"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const sd = require("schema-decorator");
function booleanExpr(usedReferences, query) {
    return new expr_1.Expr(usedReferences, sd.numberToBoolean(), query);
}
exports.booleanExpr = booleanExpr;
function nullableBooleanExpr(usedReferences, query) {
    return new expr_1.Expr(usedReferences, sd.nullable(sd.numberToBoolean()), query);
}
exports.nullableBooleanExpr = nullableBooleanExpr;
//# sourceMappingURL=boolean-expr.js.map