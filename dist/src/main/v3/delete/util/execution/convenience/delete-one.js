"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const util_1 = require("../../../../query/util");
function deleteOne(connection, table, where) {
    return connection.transactionIfNotInOne(async (connection) => {
        const result = await query_1.QueryUtil.newInstance()
            .from(table)
            .where(() => where)
            .delete(() => [table])
            .execute(connection);
        if (result.rawDeletedRowCount == 0) {
            throw new util_1.RowNotFoundError(`Expected to delete one row of ${table.alias}; found ${result.rawDeletedRowCount} rows`);
        }
        if (result.rawDeletedRowCount == 1) {
            return {
                ...result,
                foundRowCount: result.rawDeletedRowCount,
                deletedRowCount: result.rawDeletedRowCount,
            };
        }
        throw new util_1.TooManyRowsFoundError(`Expected to delete one row of ${table.alias}; found ${result.rawDeletedRowCount} rows`);
    });
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=delete-one.js.map