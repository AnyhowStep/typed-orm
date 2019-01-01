"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const update_one_by_sk_1 = require("./update-one-by-sk");
function updateAndFetchOneBySk(connection, table, sk, delegate) {
    return connection.transactionIfNotInOne(async (connection) => {
        const updateResult = await update_one_by_sk_1.updateOneBySk(connection, table, sk, delegate);
        const row = await query_1.QueryUtil.fetchOneBySk(connection, table, sk);
        return {
            ...updateResult,
            row: row,
        };
    });
}
exports.updateAndFetchOneBySk = updateAndFetchOneBySk;
//# sourceMappingURL=update-and-fetch-one-by-sk.js.map