"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const column_ref_1 = require("../../../column-ref");
const column_map_1 = require("../../../column-map");
const column_identifier_1 = require("../../../column-identifier");
function select(query, delegate) {
    const queryRef = column_ref_1.ColumnRefUtil.fromQuery(query);
    const selects = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef));
    //const queryColumnIdentifiers = ColumnIdentifierUtil.Array.fromColumnRef(queryRef);
    //TODO
    for (let selectItem of selects) {
        if (column_map_1.ColumnMapUtil.isColumnMap(selectItem)) {
            //+ columnMaps must exist
            let hasColumnMap = false;
            for (let tableAlias in queryRef) {
                const columnMap = queryRef[tableAlias];
                if (columnMap === selectItem) {
                    hasColumnMap = true;
                    break;
                }
            }
            if (!hasColumnMap) {
                throw new Error(`Invalid column map in SELECT clause`);
            }
        }
    }
    //+ If SelectItem is IExprSelectItem,
    //  the usedRef must be a subset of the queryRef
    //+ Selected columns must exist
    const selectColumnIdentifiers = column_identifier_1.ColumnIdentifierUtil.Array
        .fromSelectItemArray(selects);
    //+ Duplicates not allowed with new selects
    column_identifier_1.ColumnIdentifierUtil.Array.assertNoDuplicate(selectColumnIdentifiers);
    if (query._selects != undefined) {
        //+ Duplicates not allowed with existing selects
        const querySelectColumnIdentifiers = column_identifier_1.ColumnIdentifierUtil.Array
            .fromSelectItemArray(query._selects);
        column_identifier_1.ColumnIdentifierUtil.Array.assertNoOverlap(selectColumnIdentifiers, querySelectColumnIdentifiers);
    }
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