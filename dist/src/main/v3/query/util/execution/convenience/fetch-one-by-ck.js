"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function fetchOneByCk_EntireRow(connection, table, ck) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .select(c => [c])
        .fetchOne(connection);
}
function fetchOneByCk_Select(connection, table, ck, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .select(delegate)
        .fetchOne(connection);
}
function fetchOneByCk(connection, table, ck, delegate) {
    if (delegate == undefined) {
        return fetchOneByCk_EntireRow(connection, table, ck);
    }
    else {
        return fetchOneByCk_Select(connection, table, ck, delegate);
    }
}
exports.fetchOneByCk = fetchOneByCk;
//# sourceMappingURL=fetch-one-by-ck.js.map