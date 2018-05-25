"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../raw-expr");
const column_references_1 = require("../column-references");
function querifyNullable(left, ...rightArr) {
    let used = raw_expr_1.RawExprUtil.usedReferences(left);
    const leftQuery = raw_expr_1.RawExprUtil.querify(left);
    const rightQueries = [];
    for (let r of rightArr) {
        used = column_references_1.ColumnReferencesUtil.merge(used, raw_expr_1.RawExprUtil.usedReferences(r));
        rightQueries.push(raw_expr_1.RawExprUtil.querify(r));
    }
    return {
        used: used,
        leftQuery: leftQuery,
        rightQueries: rightQueries,
    };
}
exports.querifyNullable = querifyNullable;
function querifyNonNullable(left, ...rightArr) {
    raw_expr_1.RawExprUtil.assertNonNullable(left);
    for (let r of rightArr) {
        raw_expr_1.RawExprUtil.assertNonNullable(r);
    }
    return querifyNullable(left, ...rightArr);
}
exports.querifyNonNullable = querifyNonNullable;
//# sourceMappingURL=variadic-util.js.map