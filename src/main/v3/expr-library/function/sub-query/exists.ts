import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {FunctionCall, QueryTree} from "../../../query-tree";
import {IQuery, QueryUtil} from "../../../query";
import {IJoin} from "../../../join";
import {ColumnUtil} from "../../../column";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/exists-and-not-exists-subqueries.html
export function exists<QueryT extends QueryUtil.AfterFromClause|QueryUtil.AfterSelectClause> (
    query : IQuery
) : (
    Expr<{
        usedColumns : (
            QueryT["_parentJoins"] extends IJoin[] ?
            ColumnUtil.FromJoinArray<QueryT["_parentJoins"]>[] :
            never[]
        ),
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    const usedColumns = (
        query._parentJoins == undefined ?
        [] :
        ColumnUtil.Array.fromJoinArray(query._parentJoins)
    ) as (
        QueryT["_parentJoins"] extends IJoin[] ?
        ColumnUtil.FromJoinArray<QueryT["_parentJoins"]>[] :
        never[]
    );
    const assertDelegate = dataType.boolean();
    let queryTree : QueryTree|undefined = undefined;
    if (QueryUtil.isAfterFromClause(query)) {
        //EXISTS (... FROM table)
        if (QueryUtil.isAfterSelectClause(query)) {
            //EXISTS (SELECT x FROM table)
            queryTree = QueryUtil.queryTree_As(query);
        } else {
            if (QueryUtil.isBeforeSelectClause(query)) {
                //EXISTS (FROM table)
                queryTree = QueryUtil.queryTree_SelectStar(
                    query
                );
            } else {
                throw new Error(`Query must be either before or after SELECT clause; not neither`);
            }
        }
    } else {
        if (QueryUtil.isAfterSelectClause(query)) {
            //EXISTS (SELECT x)
            queryTree = QueryUtil.queryTree_As(query);
        } else {
            throw new Error(`Query should have either FROM or SELECT clause`);
        }
    }

    const result = new Expr(
        {
            usedColumns,
            assertDelegate,
        },
        new FunctionCall(
            "EXISTS",
            [
                queryTree
            ]
        )
    );
    return result as any;
}