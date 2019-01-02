"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_1 = require("../../../update");
const update_2 = require("./update");
function updateOne(connection, table, where, delegate) {
    const executableUpdate = update_2.update(table, where, delegate);
    return update_1.UpdateUtil.executeUpdateOne(executableUpdate, connection);
}
exports.updateOne = updateOne;
//# sourceMappingURL=update-one.js.map