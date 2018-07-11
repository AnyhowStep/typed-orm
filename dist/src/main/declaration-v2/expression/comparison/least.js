"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../expr");
const variadicUtil = require("../variadic-util");
const sd = require("schema-decorator");
const select_builder_1 = require("../../select-builder");
const column_1 = require("../../column");
const aliased_expr_1 = require("../../aliased-expr");
const join_1 = require("../../join");
const aliased_table_1 = require("../../aliased-table");
select_builder_1.SelectBuilder;
column_1.Column;
aliased_expr_1.AliasedExpr;
join_1.Join;
aliased_table_1.AliasedTable;
function least(left, ...rightArr) {
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);
    return new expr_1.Expr(q.used, sd.number(), `LEAST(${[q.leftQuery, ...q.rightQueries].join(", ")})`);
}
exports.least = least;
//# sourceMappingURL=least.js.map