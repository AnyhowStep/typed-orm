"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_one_1 = require("./fetch-one");
const operation_1 = require("../operation");
function fetchOneBySk(connection, table, sk) {
    return fetch_one_1.fetchOne(connection, table, operation_1.eqSuperKey(table, sk));
}
exports.fetchOneBySk = fetchOneBySk;
//# sourceMappingURL=fetch-one-by-sk.js.map