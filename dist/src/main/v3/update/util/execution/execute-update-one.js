"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = require("./execute");
const util_1 = require("../../../query/util");
const query_1 = require("../../../query");
async function executeUpdateOne(update, connection) {
    return connection.transactionIfNotInOne(async (connection) => {
        const updateResult = await execute_1.execute(update, connection);
        if (updateResult.foundRowCount == 1) {
            return {
                ...updateResult,
                foundRowCount: updateResult.foundRowCount,
                updatedRowCount: (updateResult.rawUpdatedRowCount > 0) ?
                    1 :
                    0
            };
        }
        const foundRowCount = (updateResult.foundRowCount == 0 ||
            updateResult.foundRowCount > 1) ?
            //We found way too many rows, or too few rows.
            updateResult.foundRowCount :
            //No assignments, so we didn't even bother updating,
            //and don't know how many rows there are.
            //So, we look for them.
            Number(await query_1.QueryUtil.count(
            //Limit 2 because we only care
            //if there are zero, one, or more.
            query_1.QueryUtil.limit(update._query, 2), connection));
        if (foundRowCount == 0) {
            if (update._query._joins == undefined || update._query._joins.length == 0) {
                throw new util_1.RowNotFoundError(`Expected to update one row; found ${foundRowCount} rows`);
            }
            else {
                throw new util_1.RowNotFoundError(`Expected to update one row of ${update._query._joins[0].aliasedTable.alias}; found ${foundRowCount} rows`);
            }
        }
        else if (foundRowCount == 1) {
            return {
                ...updateResult,
                foundRowCount,
                updatedRowCount: 0,
            };
        }
        else {
            if (update._query._joins == undefined || update._query._joins.length == 0) {
                throw new util_1.TooManyRowsFoundError(`Expected to update zero or one row; found ${foundRowCount} rows`);
            }
            else {
                throw new util_1.TooManyRowsFoundError(`Expected to update zero or one row of ${update._query._joins[0].aliasedTable.alias}; found ${foundRowCount} rows`);
            }
        }
    });
}
exports.executeUpdateOne = executeUpdateOne;
//# sourceMappingURL=execute-update-one.js.map