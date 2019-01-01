"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const update_zero_or_one_by_ck_1 = require("./update-zero-or-one-by-ck");
function updateAndFetchZeroOrOneByCk(connection, table, ck, delegate) {
    return connection.transactionIfNotInOne(async (connection) => {
        const updateResult = await update_zero_or_one_by_ck_1.updateZeroOrOneByCk(connection, table, ck, delegate);
        if (updateResult.foundRowCount == 0) {
            return {
                ...updateResult,
                row: undefined,
            };
        }
        const row = await query_1.QueryUtil.fetchOneByCk(connection, table, ck);
        return {
            ...updateResult,
            row: row,
        };
    });
}
exports.updateAndFetchZeroOrOneByCk = updateAndFetchZeroOrOneByCk;
//# sourceMappingURL=update-and-fetch-zero-or-one-by-ck.js.map