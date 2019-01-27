"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function fetchOneBySk_EntireRow(connection, table, sk) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqSuperKey(table, sk))
        .select(c => [c])
        .fetchOne(connection);
}
function fetchOneBySk_Select(connection, table, sk, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqSuperKey(table, sk))
        .select(delegate)
        .fetchOne(connection);
}
function fetchOneBySk(connection, table, sk, delegate) {
    if (delegate == undefined) {
        return fetchOneBySk_EntireRow(connection, table, sk);
    }
    else {
        return fetchOneBySk_Select(connection, table, sk, delegate);
    }
}
exports.fetchOneBySk = fetchOneBySk;
//# sourceMappingURL=fetch-one-by-sk.js.map