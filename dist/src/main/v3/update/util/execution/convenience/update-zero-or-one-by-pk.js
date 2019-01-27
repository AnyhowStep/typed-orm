"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const query_1 = require("../../../../query");
function updateZeroOrOneByPk(connection, table, pk, delegate) {
    return query_1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqPrimaryKey(table, pk))
        .set(delegate)
        .executeUpdateZeroOrOne(connection);
}
exports.updateZeroOrOneByPk = updateZeroOrOneByPk;
//# sourceMappingURL=update-zero-or-one-by-pk.js.map