"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const expr_1 = require("../../../expr");
const column_1 = require("../../../column");
const order_1 = require("../../../order");
//Must be called after `FROM`, because there's little point
//in ordering one row
function orderBy(query, delegate) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use ORDER BY before FROM clause`);
    }
    const queryRef = column_ref_1.ColumnRefUtil.fromQuery(query);
    const rawOrders = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef), query);
    //TODO-UNHACK This was fine in TS 3.3.0-dev.20190103
    const orders = order_1.OrderUtil.Array.fromRawOrderArray(rawOrders);
    for (let order of orders) {
        const orderExpr = order[0];
        if (column_1.ColumnUtil.isColumn(orderExpr)) {
            column_ref_1.ColumnRefUtil.assertHasColumnIdentifier(queryRef, orderExpr);
        }
        else if (expr_1.ExprUtil.isExpr(orderExpr)) {
            column_ref_1.ColumnRefUtil.assertHasColumnIdentifiers(queryRef, orderExpr.usedColumns);
        }
    }
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _where, _grouped, _having, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    const result = new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects,
        _where,
        _grouped,
        _having,
        _orders: (query._orders == undefined ?
            orders :
            [...query._orders, ...orders]),
        _limit,
        _unions,
        _unionOrders,
        _unionLimit,
        _mapDelegate
    });
    return result;
}
exports.orderBy = orderBy;
/*
import * as o from "../../../index";
const table = o.table("test", {
    x : o.bigint(),
    y : o.varChar.nullable(),
    z : o.boolean(),
});
const nse = o.nullSafeEq(table.columns.x, table.columns.x);
const rnse = () => nse;
const xDesc = table.columns.x.desc();
o.from(table)
    .orderBy(c => [
        c.z.desc()
    ])
    .having(rnse);
o.from(table)
    .orderBy(() => [xDesc, nse.desc()])
    .having(rnse);
o.from(table)
    .orderBy((_c) => [xDesc, nse.desc()])
    .having(rnse);

const table2 = o.table("test2", {
    x : o.bigint(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse2 = o.nullSafeEq(table.columns.x, table2.columns.x);
o.from(table)
    .orderBy((_c) => [xDesc, nse2.desc()])
    .having(rnse);

const table3 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse3 = o.nullSafeEq(table.columns.x, table3.columns.x);
o.from(table)
    .orderBy((_c) => [xDesc, nse3.desc()])
    .having(rnse);

const table4 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse4 = o.nullSafeEq(table.columns.y, table4.columns.y);
o.from(table)
    .orderBy((_c) => [xDesc, nse4.desc()])
    .having(rnse);

const table5 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse5 = o.eq(table5.columns.y, "test");
o.from(table)
    .orderBy((_c) => [xDesc, nse5.desc()])
    .having(rnse);
*/ 
//# sourceMappingURL=order-by.js.map