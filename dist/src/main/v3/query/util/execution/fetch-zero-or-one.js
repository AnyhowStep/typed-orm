"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../operation");
const fetch_all_1 = require("./fetch-all");
const operation_2 = require("../operation");
const error_1 = require("./error");
async function fetchZeroOrOne(query, connection) {
    const result = await fetch_all_1.fetchAll(
    /*
        We use LIMIT 2,
        because if we fetch more than one row,
        we've messed up.

        But I don't want to fetch 1 million rows if we mess up.
        This limits our failure.
    */
    (query._unions == undefined) ?
        ((query._limit == undefined) ?
            operation_2.limit(query, 2) :
            //The user already specified a custom limit.
            //We don't want to mess with it.
            query) :
        ((query._unionLimit == undefined) ?
            operation_1.unionLimit(query, 2) :
            //The user already specified a custom limit.
            //We don't want to mess with it.
            query), connection);
    if (result.length == 0) {
        return undefined;
    }
    else if (result.length == 1) {
        return result[0];
    }
    else {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new error_1.TooManyRowsFoundError(`Expected zero or one row, fetched more than that`);
        }
        else {
            throw new error_1.TooManyRowsFoundError(`Expected zero or one row from ${query._joins[0].aliasedTable.alias}, fetched more than that`);
        }
    }
}
exports.fetchZeroOrOne = fetchZeroOrOne;
//# sourceMappingURL=fetch-zero-or-one.js.map