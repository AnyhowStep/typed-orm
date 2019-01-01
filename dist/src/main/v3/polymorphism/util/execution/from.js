"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../../query");
function tryGetColumn(query, columnName) {
    //Looping backwards gives us a more "natural" looking
    //join in most cases
    for (let i = query._joins.length - 1; i >= 0; --i) {
        const join = query._joins[i];
        if (columnName in join.columns) {
            return join.columns[columnName];
        }
    }
    return undefined;
}
function tryGetColumnArray(query, ck) {
    const result = [];
    for (let columnName of ck) {
        const column = tryGetColumn(query, columnName);
        if (column == undefined) {
            return undefined;
        }
        result.push(column);
    }
    return result;
}
function tryGetJoinCkUsingColumnArray(query, parent) {
    for (let candidateKey of parent.candidateKeys) {
        const columns = tryGetColumnArray(query, candidateKey);
        if (columns != undefined) {
            return columns;
        }
    }
    return undefined;
}
function from(table) {
    if (table.parents.length == 0) {
        return query_1.QueryUtil.newInstance()
            .from(table);
    }
    let query = query_1.QueryUtil.newInstance()
        .from(table);
    const alreadyJoined = new Set();
    alreadyJoined.add(table.alias);
    for (let i = table.parents.length - 1; i >= 0; --i) {
        const parent = table.parents[i];
        if (alreadyJoined.has(parent.alias)) {
            continue;
        }
        alreadyJoined.add(parent.alias);
        const usingColumns = tryGetJoinCkUsingColumnArray(query, parent);
        if (usingColumns == undefined) {
            throw new Error(`Cannot join to ${parent.alias}; no candidate key to join to`);
        }
        query = query_1.QueryUtil.innerJoinCkUsing(query, parent, () => usingColumns);
    }
    return query;
}
exports.from = from;
//# sourceMappingURL=from.js.map