"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const update_one_by_pk_1 = require("./update-one-by-pk");
function updateAndFetchOneByPk(connection, table, pk, delegate) {
    return connection.transactionIfNotInOne(async (connection) => {
        const updateResult = await update_one_by_pk_1.updateOneByPk(connection, table, pk, delegate);
        const row = await query_1.QueryUtil.fetchOneByPk(connection, table, pk);
        return {
            ...updateResult,
            row: row,
        };
    });
}
exports.updateAndFetchOneByPk = updateAndFetchOneByPk;
//# sourceMappingURL=update-and-fetch-one-by-pk.js.map