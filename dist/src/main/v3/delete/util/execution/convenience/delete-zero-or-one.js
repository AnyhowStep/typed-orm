"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../../query");
const util_1 = require("../../../../query/util");
//Not meant to be called directly
function deleteZeroOrOne(connection, table, where) {
    return connection.transactionIfNotInOne(async (connection) => {
        const result = await query_1.QueryUtil.newInstance()
            .from(table)
            .__unsafeWhere(() => where)
            .delete(() => [table])
            .execute(connection);
        if (result.rawDeletedRowCount == 0) {
            return {
                ...result,
                foundRowCount: result.rawDeletedRowCount,
                deletedRowCount: result.rawDeletedRowCount,
            };
        }
        if (result.rawDeletedRowCount == 1) {
            return {
                ...result,
                foundRowCount: result.rawDeletedRowCount,
                deletedRowCount: result.rawDeletedRowCount,
            };
        }
        throw new util_1.TooManyRowsFoundError(`Expected to delete zero or one row of ${table.alias}; found ${result.rawDeletedRowCount} rows`);
    });
}
exports.deleteZeroOrOne = deleteZeroOrOne;
//# sourceMappingURL=delete-zero-or-one.js.map