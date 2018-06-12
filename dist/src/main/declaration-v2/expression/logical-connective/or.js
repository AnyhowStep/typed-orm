"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_expr_1 = require("../boolean-expr");
const variadicUtil = require("../variadic-util");
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
function or(left, ...rightArr) {
    const q = variadicUtil.querifyNonNullable(left, ...rightArr);
    return boolean_expr_1.booleanExpr(q.used, `\n\t${[q.leftQuery, ...q.rightQueries].join(" OR\n\t")}\n`);
}
exports.or = or;
//# sourceMappingURL=or.js.map