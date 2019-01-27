"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function fetchZeroOrOneByPk_EntireRow(connection, table, pk) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqPrimaryKey(table, pk))
        .select(c => [c])
        .fetchZeroOrOne(connection);
}
function fetchZeroOrOneByPk_Select(connection, table, pk, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqPrimaryKey(table, pk))
        .select(delegate)
        .fetchZeroOrOne(connection);
}
function fetchZeroOrOneByPk(connection, table, pk, delegate) {
    if (delegate == undefined) {
        return fetchZeroOrOneByPk_EntireRow(connection, table, pk);
    }
    else {
        return fetchZeroOrOneByPk_Select(connection, table, pk, delegate);
    }
}
exports.fetchZeroOrOneByPk = fetchZeroOrOneByPk;
//# sourceMappingURL=fetch-zero-or-one-by-pk.js.map