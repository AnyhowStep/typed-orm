"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const query_1 = require("../../../../query");
function updateOneByPk(connection, table, pk, delegate) {
    return query_1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqPrimaryKey(table, pk))
        .set(delegate)
        .executeUpdateOne(connection);
}
exports.updateOneByPk = updateOneByPk;
//# sourceMappingURL=update-one-by-pk.js.map