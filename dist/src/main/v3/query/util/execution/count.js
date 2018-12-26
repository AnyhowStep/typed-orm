"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicate_1 = require("../predicate");
const operation_1 = require("../operation");
const operation_2 = require("../operation");
const exprLib = require("../../../expr-library");
const fetch_value_1 = require("./fetch-value");
const constructor_1 = require("../constructor");
async function count(query, connection) {
    if (predicate_1.isAfterSelectClause(query)) {
        query = operation_1.from(constructor_1.newInstance(), operation_1.as(query, "t"));
    }
    if (predicate_1.isBeforeSelectClause(query) && predicate_1.isBeforeUnionClause(query)) {
        return fetch_value_1.fetchValue(operation_2.selectExpr({
            ...query,
            _selects: query._selects,
            _unions: query._unions,
        }, () => exprLib.count()), connection);
    }
    else {
        //This should never happen...
        if (query._joins == undefined || query._joins.length == 0) {
            throw new Error(`Cannot get count`);
        }
        else {
            throw new Error(`Cannot get count of ${query._joins[0].aliasedTable.alias}`);
        }
    }
}
exports.count = count;
//# sourceMappingURL=count.js.map