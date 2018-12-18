"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const type_1 = require("../../../type");
function unionOffset(query, offset) {
    if (offset < 0) {
        throw new Error(`offset cannot be negative`);
    }
    if (offset !== Math.floor(offset)) {
        throw new Error(`offset must be an integer`);
    }
    return new query_1.Query({
        ...query,
        _unionLimit: (query._unionLimit == undefined ?
            {
                maxRowCount: type_1.MAX_SAFE_INTEGER,
                offset,
            } :
            {
                maxRowCount: query._unionLimit.maxRowCount,
                offset,
            })
    });
}
exports.unionOffset = unionOffset;
//# sourceMappingURL=union-offset.js.map