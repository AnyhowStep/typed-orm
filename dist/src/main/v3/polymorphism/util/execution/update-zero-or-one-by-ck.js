"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_1 = require("../../../update");
const update_2 = require("./update");
function updateZeroOrOneByCk(connection, table, ck, delegate) {
    const executableUpdate = update_2.update(table, table_1.TableUtil.eqCandidateKey(table, ck), delegate);
    return update_1.UpdateUtil.executeUpdateZeroOrOne(executableUpdate, connection);
}
exports.updateZeroOrOneByCk = updateZeroOrOneByCk;
//# sourceMappingURL=update-zero-or-one-by-ck.js.map