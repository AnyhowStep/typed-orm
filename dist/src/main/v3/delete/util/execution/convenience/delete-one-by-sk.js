"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const delete_one_1 = require("./delete-one");
function deleteOneBySk(connection, table, sk) {
    return delete_one_1.deleteOne(connection, table, table_1.TableUtil.eqSuperKey(table, sk));
}
exports.deleteOneBySk = deleteOneBySk;
//# sourceMappingURL=delete-one-by-sk.js.map