"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const expr_1 = require("../../../expr");
const expr_library_1 = require("../../../expr-library");
//Must be called after `FROM` as per MySQL
function where(query, delegate) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use WHERE before FROM clause`);
    }
    const queryRef = column_ref_1.ColumnRefUtil.fromQueryJoins(query);
    const rawExpr = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef), query);
    const expr = expr_1.ExprUtil.fromRawExpr(rawExpr);
    column_ref_1.ColumnRefUtil.assertHasColumnIdentifiers(queryRef, expr.usedColumns);
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    const result = new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects,
        _where: (query._where == undefined ?
            expr :
            expr_library_1.and(query._where, expr)),
        _grouped,
        _having,
        _orders,
        _limit,
        _unions,
        _unionOrders,
        _unionLimit,
        _mapDelegate,
    });
    return result;
}
exports.where = where;
/*
import * as o from "../../../index";
const table = o.table("test", {
    x : o.bigint(),
    y : o.varChar.nullable(),
    z : o.boolean(),
});
const nse = o.nullSafeEq(table.columns.x, table.columns.x);
const rnse = () => nse
o.from(table)
    .where((_c) => nse)
    .where(rnse);

const table2 = o.table("test2", {
    x : o.bigint(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse2 = o.nullSafeEq(table.columns.x, table2.columns.x);
o.from(table)
    .where((_c) => nse2)
    .where(rnse);

const table3 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse3 = o.nullSafeEq(table.columns.x, table3.columns.x);
o.from(table)
    .where((_c) => nse3)
    .where(rnse);

const table4 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse4 = o.nullSafeEq(table.columns.y, table4.columns.y);
o.from(table)
    .where((_c) => nse4)
    .where(rnse);

const table5 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse5 = o.eq(table5.columns.y, "test");
o.from(table)
    .where((_c) => nse5)
    .where(rnse);
*/ 
//# sourceMappingURL=where.js.map