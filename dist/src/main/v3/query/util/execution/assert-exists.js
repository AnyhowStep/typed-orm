"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exists_1 = require("./exists");
const error_1 = require("./error");
async function assertExists(query, connection) {
    const found = await exists_1.exists(query, connection);
    if (!found) {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new error_1.RowNotFoundError(`Row does not exist`);
        }
        else {
            throw new error_1.RowNotFoundError(`Row of ${query._joins[0].aliasedTable.alias} does not exist`);
        }
    }
}
exports.assertExists = assertExists;
//# sourceMappingURL=assert-exists.js.map