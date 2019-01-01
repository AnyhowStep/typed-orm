"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_zero_or_one_1 = require("./update-zero-or-one");
function updateZeroOrOneByCk(connection, table, ck, delegate) {
    return update_zero_or_one_1.updateZeroOrOne(connection, table, table_1.TableUtil.eqCandidateKey(table, ck), delegate);
}
exports.updateZeroOrOneByCk = updateZeroOrOneByCk;
//# sourceMappingURL=update-zero-or-one-by-ck.js.map