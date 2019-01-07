"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const delete_zero_or_one_1 = require("./delete-zero-or-one");
function deleteZeroOrOneByCk(connection, table, ck) {
    return delete_zero_or_one_1.deleteZeroOrOne(connection, table, table_1.TableUtil.eqCandidateKey(table, ck));
}
exports.deleteZeroOrOneByCk = deleteZeroOrOneByCk;
//# sourceMappingURL=delete-zero-or-one-by-ck.js.map