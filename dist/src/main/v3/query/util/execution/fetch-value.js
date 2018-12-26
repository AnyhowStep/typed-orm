"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const fetch_value_or_undefined_1 = require("./fetch-value-or-undefined");
async function fetchValue(query, connection) {
    const result = await fetch_value_or_undefined_1.fetchValueOrUndefined(query, connection);
    if (result === undefined) {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new error_1.RowNotFoundError(`Expected one value, found zero`);
        }
        else {
            throw new error_1.RowNotFoundError(`Expected one value from ${query._joins[0].aliasedTable.alias}, found zero`);
        }
    }
    else {
        return result;
    }
}
exports.fetchValue = fetchValue;
//# sourceMappingURL=fetch-value.js.map