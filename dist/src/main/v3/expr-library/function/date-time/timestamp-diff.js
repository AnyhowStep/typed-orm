"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
const expr_1 = require("../../../expr");
const raw_expr_1 = require("../../../raw-expr");
const query_tree_1 = require("../../../query-tree");
const constant_1 = require("../../constant");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_timestampdiff
function timestampDiff(temporalUnit, from, to) {
    //Defend ourself from invalid values during run-time
    sd.enumValue(constant_1.TemporalUnit)("temporalUnit", temporalUnit);
    const result = new expr_1.Expr({
        usedRef: raw_expr_1.RawExprUtil.intersectUsedRefTuple(from, to),
        assertDelegate: dataType.bigint(),
    }, new query_tree_1.FunctionCall("TIMESTAMPDIFF", [
        temporalUnit,
        raw_expr_1.RawExprUtil.queryTree(from),
        raw_expr_1.RawExprUtil.queryTree(to),
    ]));
    return result;
}
exports.timestampDiff = timestampDiff;
//# sourceMappingURL=timestamp-diff.js.map