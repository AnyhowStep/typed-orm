"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
const fetch_all_unmapped_1 = require("./fetch-all-unmapped");
const error_1 = require("./error");
async function fetchValueArray(query, connection) {
    if (!predicate_1.isOneSelectItemQuery(query)) {
        throw new Error("Expected a query with one select item");
    }
    const unmappedRows = await fetch_all_unmapped_1.fetchAllUnmapped(query, connection);
    if (unmappedRows.length == 0) {
        return unmappedRows;
    }
    const keys = Object.keys(unmappedRows[0]);
    if (keys.length == 0) {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new error_1.NoColumnsSelectedError(`No columns were selected`);
        }
        else {
            throw new error_1.NoColumnsSelectedError(`No columns were selected from ${query._joins[0].aliasedTable.alias}`);
        }
    }
    else if (keys.length > 1) {
        if (query._joins == undefined || query._joins.length == 0) {
            throw new error_1.TooManyColumnsSelectedError(`Too many columns were selected`);
        }
        else {
            throw new error_1.TooManyColumnsSelectedError(`Too many columns were selected from ${query._joins[0].aliasedTable.alias}`);
        }
    }
    const key = keys[0];
    return unmappedRows.map(row => row[key]);
}
exports.fetchValueArray = fetchValueArray;
//# sourceMappingURL=fetch-value-array.js.map