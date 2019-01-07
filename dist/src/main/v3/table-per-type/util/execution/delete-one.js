"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../../query/util");
const delete_zero_or_one_1 = require("./delete-zero-or-one");
async function deleteOne(connection, table, where) {
    const deleteResult = await delete_zero_or_one_1.deleteZeroOrOne(connection, table, where);
    if (deleteResult.deletedRowCount == 0) {
        throw new util_1.RowNotFoundError(`Expected to delete one row of ${table.alias}; found ${deleteResult.deletedRowCount} rows`);
    }
    return deleteResult;
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=delete-one.js.map