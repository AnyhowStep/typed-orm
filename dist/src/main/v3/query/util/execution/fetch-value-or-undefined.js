"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const error_1 = require("./error");
const fetch_value_array_1 = require("./fetch-value-array");
async function fetchValueOrUndefined(query, connection) {
    const result = await fetch_value_array_1.fetchValueArray(
    /*
        We use LIMIT 2,
        because if we fetch more than one row,
        we've messed up.

        But I don't want to fetch 1 million rows if we mess up.
        This limits our failure.
    */
    (query._limit == undefined) ?
        operation_1.limit(query, 2) :
        //The user already specified a custom limit.
        //We don't want to mess with it.
        query, connection);
    if (result.length == 0) {
        return undefined;
    }
    else if (result.length == 1) {
        return result[0];
    }
    else {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new error_1.TooManyRowsFoundError(`Expected zero or one value, fetched more than that`);
        }
        else {
            throw new error_1.TooManyRowsFoundError(`Expected zero or one value from ${query._joins[0].aliasedTable.alias}, fetched more than that`);
        }
    }
}
exports.fetchValueOrUndefined = fetchValueOrUndefined;
//# sourceMappingURL=fetch-value-or-undefined.js.map