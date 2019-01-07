"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_and_fetch_one_1 = require("./update-and-fetch-one");
const operation_1 = require("../operation");
function updateAndFetchOneBySk(connection, table, sk, delegate) {
    return update_and_fetch_one_1.updateAndFetchOne(connection, table, operation_1.eqSuperKey(table, sk), delegate);
}
exports.updateAndFetchOneBySk = updateAndFetchOneBySk;
//# sourceMappingURL=update-and-fetch-one-by-sk.js.map