"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_all_unmapped_1 = require("./fetch-all-unmapped");
async function fetchAll(query, connection) {
    const unmappedRows = await fetch_all_unmapped_1.fetchAllUnmapped(query, connection);
    if (unmappedRows.length == 0) {
        return unmappedRows;
    }
    if (query._mapDelegate == undefined) {
        return unmappedRows;
    }
    else {
        const rows = [];
        for (let unmapped of unmappedRows) {
            rows.push(await query._mapDelegate(unmapped, unmapped));
        }
        return rows;
    }
}
exports.fetchAll = fetchAll;
//# sourceMappingURL=fetch-all.js.map