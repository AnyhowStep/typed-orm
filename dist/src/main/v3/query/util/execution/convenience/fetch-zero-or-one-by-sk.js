"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function fetchZeroOrOneBySk(connection, table, sk) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqSuperKey(table, sk))
        .select(c => [c])
        .fetchZeroOrOne(connection);
}
exports.fetchZeroOrOneBySk = fetchZeroOrOneBySk;
//# sourceMappingURL=fetch-zero-or-one-by-sk.js.map