"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_zero_or_one_1 = require("./fetch-zero-or-one");
const operation_1 = require("../operation");
function fetchZeroOrOneBySk(connection, table, sk) {
    return fetch_zero_or_one_1.fetchZeroOrOne(connection, table, operation_1.eqSuperKey(table, sk));
}
exports.fetchZeroOrOneBySk = fetchZeroOrOneBySk;
//# sourceMappingURL=fetch-zero-or-one-by-sk.js.map