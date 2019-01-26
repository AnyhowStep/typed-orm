"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const raw_expr_1 = require("../raw-expr");
const expr_1 = require("../expr");
const column_references_1 = require("../column-references");
const select_builder_1 = require("../select-builder");
const column_1 = require("../column");
select_builder_1.SelectBuilder;
column_1.Column;
//https://dev.mysql.com/doc/refman/5.5/en/date-and-time-functions.html#function_timestampdiff
//Returns SecondT - FirstT
//Not FirstT - SecondT
//Confusing. I know.
function timestampDiff(intervalUnit, first, second) {
    return new expr_1.Expr(column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(first), raw_expr_1.RawExprUtil.usedReferences(second)), sd.number(), `TIMESTAMPDIFF(${intervalUnit}, ${raw_expr_1.RawExprUtil.querify(first)}, ${raw_expr_1.RawExprUtil.querify(second)})`);
}
exports.timestampDiff = timestampDiff;
//# sourceMappingURL=timestamp-diff.js.map