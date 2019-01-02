"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_one_1 = require("./update-one");
function updateOneByPk(connection, table, pk, delegate) {
    return update_one_1.updateOne(connection, table, table_1.TableUtil.eqPrimaryKey(table, pk), delegate);
}
exports.updateOneByPk = updateOneByPk;
//# sourceMappingURL=update-one-by-pk.js.map