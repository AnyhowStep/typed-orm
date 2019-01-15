"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function fetchZeroOrOneBySk_EntireRow(connection, table, sk) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqSuperKey(table, sk))
        .select(c => [c])
        .fetchZeroOrOne(connection);
}
function fetchZeroOrOneBySk_Select(connection, table, sk, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqSuperKey(table, sk))
        .select(delegate)
        .fetchZeroOrOne(connection);
}
function fetchZeroOrOneBySk(connection, table, sk, delegate) {
    if (delegate == undefined) {
        return fetchZeroOrOneBySk_EntireRow(connection, table, sk);
    }
    else {
        return fetchZeroOrOneBySk_Select(connection, table, sk, delegate);
    }
}
exports.fetchZeroOrOneBySk = fetchZeroOrOneBySk;
//# sourceMappingURL=fetch-zero-or-one-by-sk.js.map