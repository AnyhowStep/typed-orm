"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_zero_or_one_1 = require("./fetch-zero-or-one");
const error_1 = require("./error");
async function fetchOne(query, connection) {
    const result = await fetch_zero_or_one_1.fetchZeroOrOne(query, connection);
    if (result === undefined) {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new error_1.RowNotFoundError(`Expected one row, found zero`);
        }
        else {
            throw new error_1.RowNotFoundError(`Expected one row from ${query._joins[0].aliasedTable.alias}, found zero`);
        }
    }
    else {
        return result;
    }
}
exports.fetchOne = fetchOne;
//# sourceMappingURL=fetch-one.js.map