"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expr_1 = require("../../../expr");
const query_tree_1 = require("../../../query-tree");
const query_1 = require("../../../query");
const column_1 = require("../../../column");
const dataType = require("../../../data-type");
//https://dev.mysql.com/doc/refman/8.0/en/exists-and-not-exists-subqueries.html
function exists(query) {
    const usedColumns = (query._parentJoins == undefined ?
        [] :
        column_1.ColumnUtil.Array.fromJoinArray(query._parentJoins));
    const assertDelegate = dataType.boolean();
    let queryTree = undefined;
    if (query_1.QueryUtil.isAfterFromClause(query)) {
        //EXISTS (... FROM table)
        if (query_1.QueryUtil.isAfterSelectClause(query)) {
            //EXISTS (SELECT x FROM table)
            queryTree = query_1.QueryUtil.queryTree_As(query);
        }
        else {
            if (query_1.QueryUtil.isBeforeSelectClause(query)) {
                //EXISTS (FROM table)
                queryTree = query_1.QueryUtil.queryTree_SelectStar(query);
            }
            else {
                throw new Error(`Query must be either before or after SELECT clause; not neither`);
            }
        }
    }
    else {
        if (query_1.QueryUtil.isAfterSelectClause(query)) {
            //EXISTS (SELECT x)
            queryTree = query_1.QueryUtil.queryTree_As(query);
        }
        else {
            throw new Error(`Query should have either FROM or SELECT clause`);
        }
    }
    const result = new expr_1.Expr({
        usedColumns,
        assertDelegate,
    }, new query_tree_1.FunctionCall("EXISTS", [
        queryTree
    ]));
    return result;
}
exports.exists = exists;
//# sourceMappingURL=exists.js.map