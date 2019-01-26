"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../raw-expr");
const expr_1 = require("../expr");
const sd = require("schema-decorator");
const column_references_1 = require("../column-references");
const select_builder_1 = require("../select-builder");
const column_1 = require("../column");
select_builder_1.SelectBuilder;
column_1.Column;
//IFNULL() is MySQL-specific, COALESCE() is more portable (standard)
function ifNull(left, right) {
    return new expr_1.Expr(column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(left), raw_expr_1.RawExprUtil.usedReferences(right)), sd.or(sd.notNullable(raw_expr_1.RawExprUtil.assertDelegate(left)), raw_expr_1.RawExprUtil.assertDelegate(right)), `IFNULL(${raw_expr_1.RawExprUtil.querify(left)}, ${raw_expr_1.RawExprUtil.querify(right)})`);
}
exports.ifNull = ifNull;
//# sourceMappingURL=if-null.js.map