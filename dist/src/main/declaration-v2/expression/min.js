"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const raw_expr_1 = require("../raw-expr");
function min(raw) {
    return new expr_1.Expr(raw_expr_1.RawExprUtil.usedReferences(raw), raw_expr_1.RawExprUtil.assertDelegate(raw), `MIN(${raw_expr_1.RawExprUtil.querify(raw)})`);
}
exports.min = min;
//# sourceMappingURL=min.js.map