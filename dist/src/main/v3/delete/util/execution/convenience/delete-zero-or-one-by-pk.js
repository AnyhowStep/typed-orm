"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const delete_zero_or_one_1 = require("./delete-zero-or-one");
function deleteZeroOrOneByPk(connection, table, pk) {
    return delete_zero_or_one_1.deleteZeroOrOne(connection, table, table_1.TableUtil.eqPrimaryKey(table, pk));
}
exports.deleteZeroOrOneByPk = deleteZeroOrOneByPk;
//# sourceMappingURL=delete-zero-or-one-by-pk.js.map