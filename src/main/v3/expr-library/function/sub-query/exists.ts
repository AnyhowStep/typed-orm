import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {FunctionCall, QueryTree} from "../../../query-tree";
import {QueryUtil} from "../../../query";
import {IJoin} from "../../../join";
import {ColumnRefUtil} from "../../../column-ref";
import * as dataType from "../../../data-type";

//https://dev.mysql.com/doc/refman/8.0/en/exists-and-not-exists-subqueries.html
export function exists<QueryT extends QueryUtil.AfterFromClause|QueryUtil.AfterSelectClause> (
    query : QueryT
) : (
    Expr<{
        usedRef : (
            QueryT["_parentJoins"] extends IJoin[] ?
            ColumnRefUtil.FromJoinArray<QueryT["_parentJoins"]> :
            {}
        ),
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    const usedRef = (
        query._parentJoins == undefined ?
        {} :
        ColumnRefUtil.fromJoinArray(query._parentJoins)
    ) as (
        QueryT["_parentJoins"] extends IJoin[] ?
        ColumnRefUtil.FromJoinArray<QueryT["_parentJoins"]> :
        {}
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

    return new Expr(
        {
            usedRef,
            assertDelegate,
        },
        new FunctionCall(
            "EXISTS",
            [
                queryTree
            ]
        )
    );
}