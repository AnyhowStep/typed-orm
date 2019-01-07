"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_zero_or_one_1 = require("./delete-zero-or-one");
const operation_1 = require("../operation");
function deleteZeroOrOneBySk(connection, table, sk) {
    return delete_zero_or_one_1.deleteZeroOrOne(connection, table, operation_1.eqSuperKey(table, sk));
}
exports.deleteZeroOrOneBySk = deleteZeroOrOneBySk;
//# sourceMappingURL=delete-zero-or-one-by-sk.js.map