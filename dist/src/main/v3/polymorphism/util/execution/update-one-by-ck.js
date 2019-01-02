"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_one_1 = require("./update-one");
function updateOneByCk(connection, table, ck, delegate) {
    return update_one_1.updateOne(connection, table, table_1.TableUtil.eqCandidateKey(table, ck), delegate);
}
exports.updateOneByCk = updateOneByCk;
//# sourceMappingURL=update-one-by-ck.js.map