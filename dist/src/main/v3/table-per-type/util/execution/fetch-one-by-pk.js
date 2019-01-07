"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const fetch_one_1 = require("./fetch-one");
function fetchOneByPk(connection, table, pk) {
    return fetch_one_1.fetchOne(connection, table, table_1.TableUtil.eqPrimaryKey(table, pk));
}
exports.fetchOneByPk = fetchOneByPk;
//# sourceMappingURL=fetch-one-by-pk.js.map