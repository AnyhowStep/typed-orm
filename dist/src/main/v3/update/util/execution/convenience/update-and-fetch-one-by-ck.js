"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const update_one_by_ck_1 = require("./update-one-by-ck");
function updateAndFetchOneByCk(connection, table, ck, delegate) {
    return connection.transactionIfNotInOne(async (connection) => {
        const updateResult = await update_one_by_ck_1.updateOneByCk(connection, table, ck, delegate);
        const row = await query_1.QueryUtil.fetchOneByCk(connection, table, ck);
        return {
            ...updateResult,
            row: row,
        };
    });
}
exports.updateAndFetchOneByCk = updateAndFetchOneByCk;
//# sourceMappingURL=update-and-fetch-one-by-ck.js.map