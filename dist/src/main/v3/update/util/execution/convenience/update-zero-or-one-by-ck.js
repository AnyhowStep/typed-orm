"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const query_1 = require("../../../../query");
/*
    Uses a transaction to ensure you really update zero or one.

    The benefit is never messing up.
    The downside is requiring a transaction.

    However, I err on the side of correctness and safety
    over performance... For now.
*/
async function updateZeroOrOneByCk(connection, table, ck, delegate) {
    return query_1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .set(delegate)
        .executeUpdateZeroOrOne(connection);
}
exports.updateZeroOrOneByCk = updateZeroOrOneByCk;
//# sourceMappingURL=update-zero-or-one-by-ck.js.map