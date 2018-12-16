"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
function limit(query, maxRowCount) {
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