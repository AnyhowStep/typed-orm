"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const raw_expr_1 = require("../raw-expr");
const sd = require("schema-decorator");
function min(raw) {
    return new expr_1.Expr(raw_expr_1.RawExprUtil.usedReferences(raw), sd.nullable(raw_expr_1.RawExprUtil.assertDelegate(raw)), `MIN(${raw_expr_1.RawExprUtil.querify(raw)})`);
}
exports.min = min;
//# sourceMappingURL=min.js.map