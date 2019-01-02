"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const fetch_zero_or_one_1 = require("./fetch-zero-or-one");
function fetchZeroOrOneByPk(connection, table, pk) {
    return fetch_zero_or_one_1.fetchZeroOrOne(connection, table, table_1.TableUtil.eqPrimaryKey(table, pk));
}
exports.fetchZeroOrOneByPk = fetchZeroOrOneByPk;
//# sourceMappingURL=fetch-zero-or-one-by-pk.js.map