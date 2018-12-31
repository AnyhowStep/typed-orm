"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
const select_value_delegate_1 = require("./select-value-delegate");
function fetchValueByPk(connection, table, pk, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqPrimaryKey(table, pk))
        .select((columns, query) => {
        return select_value_delegate_1.executeSelectValueDelegate(columns, query, delegate);
    })
        .fetchValue(connection);
}
exports.fetchValueByPk = fetchValueByPk;
//# sourceMappingURL=fetch-value-by-pk.js.map