"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const from_1 = require("./from");
const delete_1 = require("../../../delete");
const util_1 = require("../../../query/util");
function deleteOne(connection, table, where) {
    if (table.parents.length == 0) {
        return delete_1.DeleteUtil.deleteOne(connection, table, where);
    }
    return connection.transactionIfNotInOne(async (connection) => {
        const result = await delete_1.DeleteUtil.delete(query_1.QueryUtil.where(from_1.from(table), () => where), undefined, () => [...table.parents, table]).execute(connection);
        const foundRowCount = result.rawFoundRowCount / result.deletedTableCount;
        if (foundRowCount == 0) {
            throw new util_1.RowNotFoundError(`Expected to delete one row of ${table.alias}; found ${foundRowCount} rows`);
        }
        if (foundRowCount == 1) {
            return {
                ...result,
                foundRowCount: foundRowCount,
                deletedRowCount: foundRowCount,
            };
        }
        throw new util_1.TooManyRowsFoundError(`Expected to delete one row of ${table.alias}; found ${foundRowCount} rows`);
    });
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=delete-one.js.map