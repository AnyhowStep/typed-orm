"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../../../../raw-expr");
const expr_1 = require("../../../../expr");
const dataType = require("../../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_div
function integerDiv(left, right) {
    return new expr_1.Expr({
        usedColumns: raw_expr_1.RawExprUtil.Array.usedColumns([
            left,
            right
        ]),
        assertDelegate: sd.nullable(dataType.bigint()),
    }, [
        raw_expr_1.RawExprUtil.queryTree(left),
        "DIV",
        raw_expr_1.RawExprUtil.queryTree(right),
    ]);
}
exports.integerDiv = integerDiv;
//# sourceMappingURL=integer-div.js.map