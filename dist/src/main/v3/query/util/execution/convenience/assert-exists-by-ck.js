"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function assertExistsByCk(connection, table, ck) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .assertExists(connection);
}
exports.assertExistsByCk = assertExistsByCk;
//# sourceMappingURL=assert-exists-by-ck.js.map