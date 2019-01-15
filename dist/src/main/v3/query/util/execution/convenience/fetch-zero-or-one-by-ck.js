"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function fetchZeroOrOneByCk_EntireRow(connection, table, ck) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .select(c => [c])
        .fetchZeroOrOne(connection);
}
function fetchZeroOrOneByCk_Select(connection, table, ck, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .select(delegate)
        .fetchZeroOrOne(connection);
}
function fetchZeroOrOneByCk(connection, table, ck, delegate) {
    if (delegate == undefined) {
        return fetchZeroOrOneByCk_EntireRow(connection, table, ck);
    }
    else {
        return fetchZeroOrOneByCk_Select(connection, table, ck, delegate);
    }
}
exports.fetchZeroOrOneByCk = fetchZeroOrOneByCk;
//# sourceMappingURL=fetch-zero-or-one-by-ck.js.map