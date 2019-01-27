"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const query_1 = require("../../../../query");
function updateZeroOrOneByCk(connection, table, ck, delegate) {
    return query_1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .set(delegate)
        .executeUpdateZeroOrOne(connection);
}
exports.updateZeroOrOneByCk = updateZeroOrOneByCk;
//# sourceMappingURL=update-zero-or-one-by-ck.js.map