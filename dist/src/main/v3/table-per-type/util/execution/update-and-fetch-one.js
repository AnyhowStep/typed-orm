"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_one_1 = require("./update-one");
const fetch_one_1 = require("./fetch-one");
function updateAndFetchOne(connection, table, where, delegate) {
    return connection.transactionIfNotInOne(async (connection) => {
        const updateResult = await update_one_1.updateOne(connection, table, where, delegate);
        const row = await fetch_one_1.fetchOne(connection, table, where);
        return {
            ...updateResult,
            row,
        };
    });
}
exports.updateAndFetchOne = updateAndFetchOne;
//# sourceMappingURL=update-and-fetch-one.js.map