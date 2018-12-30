"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
function subQuery(query) {
    const parentJoins = [];
    if (query._parentJoins != undefined) {
        parentJoins.push(...query._parentJoins);
    }
    if (query._joins != undefined) {
        parentJoins.push(...query._joins);
    }
    return new query_1.Query({
        _distinct: false,
        _sqlCalcFoundRows: false,
        _joins: undefined,
        _parentJoins: parentJoins,
        _selects: undefined,
        _where: undefined,
        _grouped: undefined,
        _having: undefined,
        _orders: undefined,
        _limit: undefined,
        _unions: undefined,
        _unionOrders: undefined,
        _unionLimit: undefined,
        _mapDelegate: undefined,
    });
}
exports.subQuery = subQuery;
//# sourceMappingURL=sub-query.js.map