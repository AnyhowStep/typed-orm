"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_zero_or_one_1 = require("./update-zero-or-one");
function updateZeroOrOneByPk(connection, table, pk, delegate) {
    return update_zero_or_one_1.updateZeroOrOne(connection, table, table_1.TableUtil.eqPrimaryKey(table, pk), delegate);
}
exports.updateZeroOrOneByPk = updateZeroOrOneByPk;
//# sourceMappingURL=update-zero-or-one-by-pk.js.map