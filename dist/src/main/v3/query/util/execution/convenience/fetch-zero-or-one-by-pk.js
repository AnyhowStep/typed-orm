"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function fetchZeroOrOneByPk(connection, table, pk) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .where(() => table_1.TableUtil.eqPrimaryKey(table, pk))
        .select(c => [c])
        .fetchZeroOrOne(connection);
}
exports.fetchZeroOrOneByPk = fetchZeroOrOneByPk;
//# sourceMappingURL=fetch-zero-or-one-by-pk.js.map