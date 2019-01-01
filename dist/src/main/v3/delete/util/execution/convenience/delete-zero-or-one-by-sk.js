"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const delete_zero_or_one_1 = require("./delete-zero-or-one");
function deleteZeroOrOneBySk(connection, table, sk) {
    return delete_zero_or_one_1.deleteZeroOrOne(connection, table, table_1.TableUtil.eqSuperKey(table, sk));
}
exports.deleteZeroOrOneBySk = deleteZeroOrOneBySk;
//# sourceMappingURL=delete-zero-or-one-by-sk.js.map