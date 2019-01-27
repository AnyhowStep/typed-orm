"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const expr_1 = require("../../../expr");
const expr_library_1 = require("../../../expr-library");
const column_identifier_ref_1 = require("../../../column-identifier-ref");
//Must be called after `FROM` as per MySQL
function having(query, delegate) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use HAVING before FROM clause`);
    }
    const queryRef = column_ref_1.ColumnRefUtil.fromQuery(query);
    const rawExpr = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef), query);
    const expr = expr_1.ExprUtil.fromRawExpr(rawExpr);
    column_identifier_ref_1.ColumnIdentifierRefUtil.assertHasColumnIdentifiers(queryRef, expr.usedColumns);
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _where, _grouped, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    //TODO Investigate why removing `as any` causes lag
    //and failure
    const result = new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects,
        _where,
        _grouped,
        _having: (query._having == undefined ?
            expr :
            expr_library_1.and(query._having, expr)),
        _orders,
        _limit,
        _unions,
        _unionOrders,
        _unionLimit,
        _mapDelegate,
    });
    return result;
}
exports.having = having;
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
    .having((_c) => nse)
    .having(rnse);

const table2 = o.table("test2", {
    x : o.bigint(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse2 = o.nullSafeEq(table.columns.x, table2.columns.x);
o.from(table)
    .having((_c) => nse2)
    .having(rnse);

const table3 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse3 = o.nullSafeEq(table.columns.x, table3.columns.x);
o.from(table)
    .having((_c) => nse3)
    .having(rnse);

const table4 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse4 = o.nullSafeEq(table.columns.y, table4.columns.y);
o.from(table)
    .having((_c) => nse4)
    .having(rnse);

const table5 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse5 = o.eq(table5.columns.y, "test");
o.from(table)
    .having((_c) => nse5)
    .having(rnse);
*/ 
//# sourceMappingURL=and-having.js.map