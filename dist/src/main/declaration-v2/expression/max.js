"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const raw_expr_1 = require("../raw-expr");
const sd = require("schema-decorator");
function max(raw) {
    return new expr_1.Expr(raw_expr_1.RawExprUtil.usedReferences(raw), sd.nullable(raw_expr_1.RawExprUtil.assertDelegate(raw)), `MAX(${raw_expr_1.RawExprUtil.querify(raw)})`);
}
exports.max = max;
//# sourceMappingURL=max.js.map