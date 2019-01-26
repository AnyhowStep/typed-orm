"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../raw-expr");
const expr_1 = require("../expr");
const sd = require("schema-decorator");
const variadicUtil = require("./variadic-util");
function coalesce(left, ...rightArr) {
    const q = variadicUtil.querifyNullable(left, ...rightArr);
    return new expr_1.Expr(q.used, sd.or(sd.notNullable(raw_expr_1.RawExprUtil.assertDelegate(left)), ...rightArr.map((expr, index) => {
        if (index == rightArr.length - 1) {
            return raw_expr_1.RawExprUtil.assertDelegate(expr);
        }
        else {
            return sd.notNullable(raw_expr_1.RawExprUtil.assertDelegate(expr));
        }
    })), `COALESCE(${q.leftQuery}, ${q.rightQueries.join(",")})`);
}
exports.coalesce = coalesce;
//# sourceMappingURL=coalesce.js.map