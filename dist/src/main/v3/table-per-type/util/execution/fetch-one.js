"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
const from_1 = require("./from");
async function fetchOne(connection, table, where) {
    if (table.parents.length == 0) {
        return query_1.QueryUtil.fetchOne(query_1.QueryUtil.newInstance()
            .from(table)
            .where(() => where)
            .select(c => [c]), connection);
    }
    const rawResult = await query_1.QueryUtil.fetchOne(query_1.QueryUtil.select(query_1.QueryUtil.where(from_1.from(table), (() => where)), ((c) => [c])), connection);
    const result = {};
    const alreadyCopied = new Set();
    for (let p of table.parents) {
        if (alreadyCopied.has(p.alias)) {
            continue;
        }
        alreadyCopied.add(p.alias);
        for (let columnName in p.columns) {
            result[columnName] = rawResult[p.alias][columnName];
        }
    }
    for (let columnName in table.columns) {
        result[columnName] = rawResult[table.alias][columnName];
    }
    return result;
}
exports.fetchOne = fetchOne;
//# sourceMappingURL=fetch-one.js.map