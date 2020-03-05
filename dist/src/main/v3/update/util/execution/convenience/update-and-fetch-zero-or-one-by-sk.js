"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const update_zero_or_one_by_sk_1 = require("./update-zero-or-one-by-sk");
function updateAndFetchZeroOrOneBySk(connection, table, sk, delegate) {
    return connection.transactionIfNotInOne(async (connection) => {
        const updateResult = await update_zero_or_one_by_sk_1.updateZeroOrOneBySk(connection, table, sk, delegate);
        if (updateResult.foundRowCount == 0) {
            return {
                ...updateResult,
                row: undefined,
            };
        }
        const row = await query_1.QueryUtil.fetchOneBySk(connection, table, sk);
        await connection.pool.onUpdateAndFetch.invoke({
            type: "updateAndFetch",
            table: table,
            connection,
            row: row,
        });
        return {
            ...updateResult,
            row: row,
        };
    });
}
exports.updateAndFetchZeroOrOneBySk = updateAndFetchZeroOrOneBySk;
//# sourceMappingURL=update-and-fetch-zero-or-one-by-sk.js.map