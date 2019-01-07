"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_and_fetch_zero_or_one_1 = require("./update-and-fetch-zero-or-one");
function updateAndFetchZeroOrOneByPk(connection, table, pk, delegate) {
    return update_and_fetch_zero_or_one_1.updateAndFetchZeroOrOne(connection, table, table_1.TableUtil.eqPrimaryKey(table, pk), delegate);
}
exports.updateAndFetchZeroOrOneByPk = updateAndFetchZeroOrOneByPk;
//# sourceMappingURL=update-and-fetch-zero-or-one-by-pk.js.map