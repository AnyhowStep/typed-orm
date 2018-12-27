"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function fetchOneByCk(connection, table, ck) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .select(c => [c])
        .fetchOne(connection);
}
exports.fetchOneByCk = fetchOneByCk;
//# sourceMappingURL=fetch-one-by-ck.js.map