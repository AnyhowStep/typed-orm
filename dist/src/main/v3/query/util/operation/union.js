"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const constants_1 = require("../../../constants");
const column_map_1 = require("../../../column-map");
const column_identifier_map_1 = require("../../../column-identifier-map");
function union(query, other, unionType = constants_1.DISTINCT) {
    if (query._selects == undefined) {
        throw new Error(`Cannot use UNION before SELECT clause`);
    }
    if (other._selects == undefined) {
        throw new Error(`Cannot use query as UNION target before SELECT clause`);
    }
    /*
        We can't really have many run-time checks.
        We can't check that the assert delegates are compatible.
    */
    if (query._selects.length != other._selects.length) {
        throw new Error(`UNION target must have ${query._selects.length} select items; found ${other._selects.length}`);
    }
    for (let i = 0; i < query._selects.length; ++i) {
        const itemA = query._selects[i];
        const itemB = other._selects[i];
        if (column_map_1.ColumnMapUtil.isColumnMap(itemA)) {
            if (column_map_1.ColumnMapUtil.isColumnMap(itemB)) {
                column_identifier_map_1.ColumnIdentifierMapUtil.assertIsColumnNameSubset(itemA, itemB);
                column_identifier_map_1.ColumnIdentifierMapUtil.assertIsColumnNameSubset(itemB, itemA);
            }
            else {
                throw new Error(`UNION target must have a column map for select item ${i}`);
            }
        }
        else {
            if (column_map_1.ColumnMapUtil.isColumnMap(itemB)) {
                throw new Error(`UNION target cannot have a column map for select item ${i}`);
            }
        }
    }
    const unionQuery = {
        distinct: (unionType == constants_1.DISTINCT),
        query: other,
    };
    const { _distinct, _sqlCalcFoundRows, _joins, _parentJoins, _selects, _where, _grouped, _having, _orders, _limit, _unionOrders, _unionLimit, _mapDelegate, } = query;
    return new query_1.Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins,
        _parentJoins,
        _selects,
        _where,
        _grouped,
        _having,
        _orders,
        _limit,
        _unions: (query._unions == undefined ?
            [unionQuery] :
            [...query._unions, unionQuery]),
        _unionOrders,
        _unionLimit,
        _mapDelegate,
    });
}
exports.union = union;
//# sourceMappingURL=union.js.map