"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const type_1 = require("../../../type");
function offset(query, offset) {
    if (offset < 0) {
        throw new Error(`offset cannot be negative`);
    }
    if (offset !== Math.floor(offset)) {
        throw new Error(`offset must be an integer`);
    }
    return new query_1.Query({
        ...query,
        _limit: (query._limit == undefined ?
            {
                maxRowCount: type_1.MAX_SAFE_INTEGER,
                offset,
            } :
            {
                maxRowCount: query._limit.maxRowCount,
                offset,
            })
    });
}
exports.offset = offset;
//# sourceMappingURL=offset.js.map