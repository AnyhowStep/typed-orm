"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_one_1 = require("./delete-one");
const operation_1 = require("../operation");
function deleteOneBySk(connection, table, sk) {
    return delete_one_1.deleteOne(connection, table, operation_1.eqSuperKey(table, sk));
}
exports.deleteOneBySk = deleteOneBySk;
//# sourceMappingURL=delete-one-by-sk.js.map