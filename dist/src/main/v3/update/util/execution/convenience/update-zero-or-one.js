"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
async function updateZeroOrOne(connection, table, ck, delegate) {
    return query_1.QueryUtil.newInstance()
        .from(table)
        .whereEqCandidateKey(table, ck)
        .set(delegate)
        .execute(connection);
}
exports.updateZeroOrOne = updateZeroOrOne;
//# sourceMappingURL=update-zero-or-one.js.map