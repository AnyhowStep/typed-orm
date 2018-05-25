"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../expr");
const raw_expr_1 = require("../raw-expr");
const sd = require("schema-decorator");
const variadicUtil = require("./variadic-util");
exports.COUNT_ALL = new expr_1.Expr({}, sd.naturalNumber(), "COUNT(*)");
function count(raw) {
    return new expr_1.Expr(raw_expr_1.RawExprUtil.usedReferences(raw), sd.naturalNumber(), `COUNT(${raw_expr_1.RawExprUtil.querify(raw)})`);
}
exports.count = count;
function countDistinct(left, ...rightArr) {
    const q = variadicUtil.querifyNullable(left, ...rightArr);
    return new expr_1.Expr(q.used, sd.naturalNumber(), `COUNT(DISTINCT ${q.leftQuery}, ${q.rightQueries.join(",")})`);
}
exports.countDistinct = countDistinct;
//# sourceMappingURL=count.js.map