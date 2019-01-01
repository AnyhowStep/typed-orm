"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../../table");
const delete_one_1 = require("./delete-one");
function deleteOneByPk(connection, table, pk) {
    return delete_one_1.deleteOne(connection, table, table_1.TableUtil.eqPrimaryKey(table, pk));
}
exports.deleteOneByPk = deleteOneByPk;
//# sourceMappingURL=delete-one-by-pk.js.map