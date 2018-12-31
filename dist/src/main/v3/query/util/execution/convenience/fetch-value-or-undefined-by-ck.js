"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
const select_value_delegate_1 = require("./select-value-delegate");
function fetchValueOrUndefinedByCk(connection, table, ck, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .select((columns, query) => {
        return select_value_delegate_1.executeSelectValueDelegate(columns, query, delegate);
    })
        .fetchValueOrUndefined(connection);
}
exports.fetchValueOrUndefinedByCk = fetchValueOrUndefinedByCk;
//# sourceMappingURL=fetch-value-or-undefined-by-ck.js.map