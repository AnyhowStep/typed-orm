"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
const select_value_delegate_1 = require("./select-value-delegate");
function fetchValueOrUndefinedBySk(connection, table, sk, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqSuperKey(table, sk))
        .select((columns, query) => {
        return select_value_delegate_1.executeSelectValueDelegate(columns, query, delegate);
    })
        .fetchValueOrUndefined(connection);
}
exports.fetchValueOrUndefinedBySk = fetchValueOrUndefinedBySk;
//# sourceMappingURL=fetch-value-or-undefined-by-sk.js.map