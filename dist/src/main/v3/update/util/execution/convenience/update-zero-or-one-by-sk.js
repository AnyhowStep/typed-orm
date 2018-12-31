"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const query_1 = require("../../../../query");
function updateZeroOrOneBySk(connection, table, sk, delegate) {
    return query_1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqSuperKey(table, sk))
        .set(delegate)
        .executeUpdateZeroOrOne(connection);
}
exports.updateZeroOrOneBySk = updateZeroOrOneBySk;
//# sourceMappingURL=update-zero-or-one-by-sk.js.map