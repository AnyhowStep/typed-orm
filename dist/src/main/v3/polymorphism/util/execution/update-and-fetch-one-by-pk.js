"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_and_fetch_one_1 = require("./update-and-fetch-one");
function updateAndFetchOneByPk(connection, table, pk, delegate) {
    return update_and_fetch_one_1.updateAndFetchOne(connection, table, table_1.TableUtil.eqPrimaryKey(table, pk), delegate);
}
exports.updateAndFetchOneByPk = updateAndFetchOneByPk;
//# sourceMappingURL=update-and-fetch-one-by-pk.js.map