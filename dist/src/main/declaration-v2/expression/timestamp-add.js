"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("../raw-expr");
const expr_1 = require("../expr");
const column_references_1 = require("../column-references");
const select_builder_1 = require("../select-builder");
const column_1 = require("../column");
select_builder_1.SelectBuilder;
column_1.Column;
function timestampAdd(intervalUnit, interval, dateTime) {
    return new expr_1.Expr(column_references_1.ColumnReferencesUtil.merge(raw_expr_1.RawExprUtil.usedReferences(interval), raw_expr_1.RawExprUtil.usedReferences(dateTime)), 
    //Not totally sure this is correct, maybe make it just dateTimeWithMillisecond() ?
    //Or should it resolve to a string because MySQL supports microseconds but JS' Date does not...
    raw_expr_1.RawExprUtil.assertDelegate(dateTime), `TIMESTAMPADD(${intervalUnit}, ${raw_expr_1.RawExprUtil.querify(interval)}, ${raw_expr_1.RawExprUtil.querify(dateTime)})`);
}
exports.timestampAdd = timestampAdd;
//# sourceMappingURL=timestamp-add.js.map