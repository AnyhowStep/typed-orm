"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("./expr");
function booleanExpr(usedReferences, query) {
    return new expr_1.Expr(usedReferences, sd.numberToBoolean(), query);
}
exports.booleanExpr = booleanExpr;
//# sourceMappingURL=expr-factory.js.map