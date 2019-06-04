"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/cast-functions.html#function_cast
function castAsDateTime(rawExpr, fractionalSecondPrecision = 0) {
    fractionalSecondPrecision = sd.literal(0, 1, 2, 3)("fractionalSecondPrecision", fractionalSecondPrecision);
    return new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.usedRef(rawExpr),
        assertDelegate: dataType.dateTime(fractionalSecondPrecision),
    }, new query_tree_1.FunctionCall("CAST", [
        [
            raw_expr_1.RawExprUtil.queryTree(rawExpr),
            "AS",
            `DATETIME(${fractionalSecondPrecision})`
        ]
    ]));
}
exports.castAsDateTime = castAsDateTime;
//# sourceMappingURL=cast-as-date-time.js.map