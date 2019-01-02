"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_one_1 = require("./update-one");
function updateOneBySk(connection, table, sk, delegate) {
    return update_one_1.updateOne(connection, table, table_1.TableUtil.eqSuperKey(table, sk), delegate);
}
exports.updateOneBySk = updateOneBySk;
//# sourceMappingURL=update-one-by-sk.js.map