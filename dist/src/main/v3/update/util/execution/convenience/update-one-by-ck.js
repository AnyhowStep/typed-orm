"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const query_1 = require("../../../../query");
function updateOneByCk(connection, table, ck, delegate) {
    return query_1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .set(delegate)
        .executeUpdateOne(connection);
}
exports.updateOneByCk = updateOneByCk;
//# sourceMappingURL=update-one-by-ck.js.map