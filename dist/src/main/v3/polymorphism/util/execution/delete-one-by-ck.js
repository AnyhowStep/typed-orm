"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const delete_one_1 = require("./delete-one");
function deleteOneByCk(connection, table, ck) {
    return delete_one_1.deleteOne(connection, table, table_1.TableUtil.eqCandidateKey(table, ck));
}
exports.deleteOneByCk = deleteOneByCk;
//# sourceMappingURL=delete-one-by-ck.js.map