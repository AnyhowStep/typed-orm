"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function assertExistsBySk(connection, table, sk) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqSuperKey(table, sk))
        .assertExists(connection);
}
exports.assertExistsBySk = assertExistsBySk;
//# sourceMappingURL=assert-exists-by-sk.js.map