"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_all_1 = require("./fetch-all");
const operation_1 = require("../operation");
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
    operation_1.limit(query, 2), connection);
    if (result.length == 0) {
        return undefined;
    }
    else if (result.length == 1) {
        return result[0];
    }
    else {
        throw new error_1.TooManyRowsFoundError(`Expected zero or one row, fetched more than that`);
    }
}
exports.fetchZeroOrOne = fetchZeroOrOne;
//# sourceMappingURL=fetch-zero-or-one.js.map