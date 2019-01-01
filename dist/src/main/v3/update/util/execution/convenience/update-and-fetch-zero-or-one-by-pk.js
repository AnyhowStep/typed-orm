"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const update_zero_or_one_by_pk_1 = require("./update-zero-or-one-by-pk");
function updateAndFetchZeroOrOneByPk(connection, table, pk, delegate) {
    return connection.transactionIfNotInOne(async (connection) => {
        const updateResult = await update_zero_or_one_by_pk_1.updateZeroOrOneByPk(connection, table, pk, delegate);
        if (updateResult.foundRowCount == 0) {
            return {
                ...updateResult,
                row: undefined,
            };
        }
        const row = await query_1.QueryUtil.fetchOneByPk(connection, table, pk);
        return {
            ...updateResult,
            row: row,
        };
    });
}
exports.updateAndFetchZeroOrOneByPk = updateAndFetchZeroOrOneByPk;
//# sourceMappingURL=update-and-fetch-zero-or-one-by-pk.js.map