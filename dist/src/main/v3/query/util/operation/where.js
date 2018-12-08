"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const expr_1 = require("../../../expr");
//Must be called after `FROM` as per MySQL
function where(query, delegate) {
    const queryRef = column_ref_1.ColumnRefUtil.fromQuery(query);
    const rawExpr = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef), query);
    const expr = expr_1.ExprUtil.fromRawExpr(rawExpr);
    column_ref_1.ColumnRefUtil.assertIsSubset(expr.usedRef, queryRef);
    return new query_1.Query({
        ...query,
        //TODO This should be (query._where AND expr)
        where: expr
    });
}
exports.where = where;
//# sourceMappingURL=where.js.map