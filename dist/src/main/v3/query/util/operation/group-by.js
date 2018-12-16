"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_identifier_ref_1 = require("../../../column-identifier-ref");
function groupBy(query, delegate) {
    if (query._joins == undefined) {
        throw new Error(`Cannot use GROUP BY before FROM clause`);
    }
    const queryRef = column_identifier_ref_1.ColumnIdentifierRefUtil.fromQuery(query);
    const grouped = delegate(column_identifier_ref_1.ColumnIdentifierRefUtil.toConvenient(queryRef));
    column_identifier_ref_1.ColumnIdentifierRefUtil.assertHasColumnIdentifiers(queryRef, grouped);
    const newGrouped = ((query._grouped == undefined) ?
        grouped :
        [...query._grouped, ...grouped]);
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _where, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects,
        _where,
        _grouped: newGrouped,
        _having,
        _orders,
        _limit,
        _unions,
        _unionOrders,
        _unionLimit,
        _mapDelegate,
    });
}
exports.groupBy = groupBy;
//# sourceMappingURL=group-by.js.map