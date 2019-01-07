"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const constants_1 = require("../../../constants");
function queryTree({ tableAlias, name, __isInSelectClause, }) {
    if (tableAlias == constants_1.ALIASED) {
        /*
            When you want to write,
            (1 + 2) AS three

            You write,
            add(1, 2).as("three")

            This "three" is an IExprSelectItem but has no tableAlias
            associated with it.

            So, this library makes up a table alias that is very
            unlikely to be used naturally by others.
        */
        return sqlstring_1.escapeId(`${tableAlias}${constants_1.SEPARATOR}${name}`);
    }
    else {
        if (__isInSelectClause) {
            return sqlstring_1.escapeId(`${tableAlias}${constants_1.SEPARATOR}${name}`);
        }
        else {
            /*
                The most common case, I think.
            */
            return (sqlstring_1.escapeId(tableAlias) +
                "." +
                sqlstring_1.escapeId(name));
        }
    }
}
exports.queryTree = queryTree;
//# sourceMappingURL=query-tree.js.map