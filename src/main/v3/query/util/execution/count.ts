import {
    MainQuery,
    isAfterSelectClause,
    isBeforeUnionClause,
    isBeforeSelectClause,
} from "../predicate";
import {IConnection} from "../../../execution";
import {from, as} from "../operation";
import {selectExpr} from "../operation";
import * as exprLib from "../../../expr-library";
import {fetchValue} from "./fetch-value";
import {newInstance} from "../constructor";

export async function count(
    query : MainQuery,
    connection : IConnection
) : Promise<bigint> {
    if (isAfterSelectClause(query)) {
        query = from(
            newInstance(),
            as(query, "t")
        );
    }
    if (isBeforeSelectClause(query) && isBeforeUnionClause(query)) {
        return fetchValue(
            selectExpr(
                {
                    ...query,
                    _selects : query._selects,
                    _unions : query._unions,
                },
                () => exprLib.count()
            ),
            connection
        );
    } else {
        //This should never happen...
        if (query._joins == undefined || query._joins.length == 0) {
            throw new Error(`Cannot get count`);
        } else {
            throw new Error(`Cannot get count of ${query._joins[0].aliasedTable.alias}`);
        }
    }
}