"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../raw-expr");
const expr_1 = require("../expr");
const sd = require("schema-decorator");
const variadicUtil = require("./variadic-util");
function coalesce(left, ...rightArr) {
    const q = variadicUtil.querifyNullable(left, ...rightArr);
    return new expr_1.Expr(q.used, sd.or(raw_expr_1.RawExprUtil.assertDelegate(left), ...rightArr.map(raw_expr_1.RawExprUtil.assertDelegate)), `COALESCE(${q.leftQuery}, ${q.rightQueries.join(",")})`);
}
exports.coalesce = coalesce;
//# sourceMappingURL=coalesce.js.map