"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
function limit(query, maxRowCount) {
    if (maxRowCount < 0) {
        throw new Error(`maxRowCount cannot be negative`);
    }
    if (maxRowCount !== Math.floor(maxRowCount)) {
        throw new Error(`maxRowCount must be an integer`);
    }
    return new query_1.Query({
        ...query,
        _limit: (query._limit == undefined ?
            {
                maxRowCount,
                offset: 0,
            } :
            {
                maxRowCount,
                offset: query._limit.offset,
            })
    });
}
exports.limit = limit;
//# sourceMappingURL=limit.js.map