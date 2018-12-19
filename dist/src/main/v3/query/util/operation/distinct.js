"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
function distinct(query) {
    if (query._selects == undefined) {
        throw new Error(`Cannot use DISTINCT before SELECT clause`);
    }
    return new query_1.Query({
        ...query,
        _distinct: true,
    });
}
exports.distinct = distinct;
//# sourceMappingURL=distinct.js.map