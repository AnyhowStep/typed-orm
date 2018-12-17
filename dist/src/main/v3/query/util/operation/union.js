"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../query");
const constants_1 = require("../../../constants");
function union(query, other, unionType = constants_1.DISTINCT) {
    if (query._selects == undefined) {
        throw new Error(`Cannot use UNION before SELECT clause`);
    }
    //TODO Run-time union compatibility checks
    const unionQuery = {
        distinct: (unionType == constants_1.DISTINCT),
        query: other,
    };
    return new query_1.Query({
        ...query,
        _unions: (query._unions == undefined ?
            [unionQuery] :
            [...query._unions, unionQuery])
    });
}
exports.union = union;
//# sourceMappingURL=union.js.map