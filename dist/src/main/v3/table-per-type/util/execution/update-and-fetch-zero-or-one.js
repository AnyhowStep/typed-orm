"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_zero_or_one_1 = require("./update-zero-or-one");
const fetch_zero_or_one_1 = require("./fetch-zero-or-one");
function updateAndFetchZeroOrOne(connection, table, where, delegate) {
    return connection.transactionIfNotInOne(async (connection) => {
        const updateResult = await update_zero_or_one_1.updateZeroOrOne(connection, table, where, delegate);
        if (updateResult.foundRowCount == 0) {
            return {
                ...updateResult,
                row: undefined,
            };
        }
        const row = await fetch_zero_or_one_1.fetchZeroOrOne(connection, table, where);
        return {
            ...updateResult,
            row,
        };
    });
}
exports.updateAndFetchZeroOrOne = updateAndFetchZeroOrOne;
//# sourceMappingURL=update-and-fetch-zero-or-one.js.map