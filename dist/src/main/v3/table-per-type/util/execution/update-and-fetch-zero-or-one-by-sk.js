"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_and_fetch_zero_or_one_1 = require("./update-and-fetch-zero-or-one");
const operation_1 = require("../operation");
function updateAndFetchZeroOrOneBySk(connection, table, sk, delegate) {
    return update_and_fetch_zero_or_one_1.updateAndFetchZeroOrOne(connection, table, operation_1.eqSuperKey(table, sk), delegate);
}
exports.updateAndFetchZeroOrOneBySk = updateAndFetchZeroOrOneBySk;
//# sourceMappingURL=update-and-fetch-zero-or-one-by-sk.js.map