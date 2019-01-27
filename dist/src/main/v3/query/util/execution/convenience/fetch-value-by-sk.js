"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
const select_value_delegate_1 = require("./select-value-delegate");
function fetchValueBySk(connection, table, sk, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqSuperKey(table, sk))
        .select((columns, query) => {
        return select_value_delegate_1.executeSelectValueDelegate(columns, query, delegate);
    })
        .fetchValue(connection);
}
exports.fetchValueBySk = fetchValueBySk;
//# sourceMappingURL=fetch-value-by-sk.js.map