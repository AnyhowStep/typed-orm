"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const expr_library_1 = require("../../../expr-library");
const table_1 = require("../../../table");
const column_identifier_ref_1 = require("../../../column-identifier-ref");
const column_ref_1 = require("../../../column-ref");
/*
    Will ignore extra fields that are not columns of the table
*/
function whereEqColumns(query, table, columns) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use whereEqColumns() before FROM clause`);
    }
    const ref = column_identifier_ref_1.ColumnIdentifierRefUtil.fromJoinArray(query._joins);
    const condition = table_1.TableUtil.eqColumns(table, columns);
    column_ref_1.ColumnRefUtil.assertIsSubset(condition.usedRef, ref);
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects,
        _where: (query._where == undefined ?
            condition :
            expr_library_1.and(query._where, condition)),
        _grouped,
        _having,
        _orders,
        _limit,
        _unions,
        _unionOrders,
        _unionLimit,
        _mapDelegate,
    });
}
exports.whereEqColumns = whereEqColumns;
//# sourceMappingURL=where-eq-columns.js.map