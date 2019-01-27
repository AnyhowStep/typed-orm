"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function fetchOneByPk_EntireRow(connection, table, pk) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqPrimaryKey(table, pk))
        .select(c => [c])
        .fetchOne(connection);
}
function fetchOneByPk_Select(connection, table, pk, delegate) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqPrimaryKey(table, pk))
        .select(delegate)
        .fetchOne(connection);
}
function fetchOneByPk(connection, table, pk, delegate) {
    if (delegate == undefined) {
        return fetchOneByPk_EntireRow(connection, table, pk);
    }
    else {
        return fetchOneByPk_Select(connection, table, pk, delegate);
    }
}
exports.fetchOneByPk = fetchOneByPk;
//# sourceMappingURL=fetch-one-by-pk.js.map