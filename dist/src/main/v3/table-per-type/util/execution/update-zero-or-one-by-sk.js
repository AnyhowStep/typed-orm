"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const update_zero_or_one_1 = require("./update-zero-or-one");
function updateZeroOrOneBySk(connection, table, sk, delegate) {
    return update_zero_or_one_1.updateZeroOrOne(connection, table, operation_1.eqSuperKey(table, sk), delegate);
}
exports.updateZeroOrOneBySk = updateZeroOrOneBySk;
//# sourceMappingURL=update-zero-or-one-by-sk.js.map