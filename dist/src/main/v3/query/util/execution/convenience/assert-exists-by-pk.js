"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function assertExistsByPk(connection, table, pk) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqPrimaryKey(table, pk))
        .assertExists(connection);
}
exports.assertExistsByPk = assertExistsByPk;
//# sourceMappingURL=assert-exists-by-pk.js.map