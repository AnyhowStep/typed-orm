"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../../raw-expr");
const expr_1 = require("../../expr");
const sd = require("schema-decorator");
//If this operator is used with a BIGINT, the return value is also a BIGINT.
//This means that you should avoid using - on integers that may have the value of −(2^63).
function neg(raw) {
    raw_expr_1.RawExprUtil.assertNonNullable(raw);
    return new expr_1.Expr(raw_expr_1.RawExprUtil.usedReferences(raw), sd.number(), `-(${raw_expr_1.RawExprUtil.querify(raw)})`);
}
exports.neg = neg;
//# sourceMappingURL=neg.js.map