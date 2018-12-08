"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
function select(query, delegate) {
    const queryRef = column_ref_1.ColumnRefUtil.fromQuery(query);
    const selects = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef));
    //TODO
    //+ If SelectItem is IExprSelectItem,
    //  the usedRef must be a subset of the queryRef.
    //+ Selected columns/columnMaps must exist.
    //+ Duplicates not allowed with existing selects
    //+ Duplicates not allowed with new selects
    const newSelects = ((query._selects == undefined) ?
        selects :
        [...query._selects, ...selects]);
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _where, _grouped, _having, _orders, _limit, _unions, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects: newSelects,
        _where,
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
exports.select = select;
//# sourceMappingURL=select.js.map