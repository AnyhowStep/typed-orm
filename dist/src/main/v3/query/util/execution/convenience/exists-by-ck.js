"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const __1 = require("../../..");
function existsByCk(connection, table, ck) {
    return __1.QueryUtil.newInstance()
        .from(table)
        .__unsafeWhere(() => table_1.TableUtil.eqCandidateKey(table, ck))
        .exists(connection);
}
exports.existsByCk = existsByCk;
//# sourceMappingURL=exists-by-ck.js.map