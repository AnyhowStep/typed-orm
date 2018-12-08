"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../query");
function newInstance() {
    return new query_1.Query({
        _distinct: false,
        _sqlCalcFoundRows: false,
        _joins: undefined,
        _parentJoins: undefined,
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
exports.newInstance = newInstance;
//# sourceMappingURL=constructor.js.map