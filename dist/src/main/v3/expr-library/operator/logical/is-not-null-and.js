"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const column_1 = require("../../../column");
const comparison_1 = require("../comparison");
const and_1 = require("./and");
function isNotNullAnd(column, exprDelegate) {
    return and_1.and(comparison_1.isNotNull(column), exprDelegate({
        [column.name]: column_1.ColumnUtil.toNonNullable(column)
    }));
}
exports.isNotNullAnd = isNotNullAnd;
//# sourceMappingURL=is-not-null-and.js.map