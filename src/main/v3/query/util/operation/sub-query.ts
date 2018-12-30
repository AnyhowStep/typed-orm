import {IQuery, Query} from "../../query";
import {IJoin} from "../../../join";

/*
    TODO-Feature Subquery and allow selected items
    to be visible?

    Contrived example:

    SELECT
        RAND() AS r
    FROM
        a
    HAVING
        COALESCE(
            (
                SELECT
                    booleanValue
                FROM
                    b
                WHERE
                    doubleValue > r
                LIMIT
                    1
            ),
            TRUE
        )
*/
export type SubQueryResult<QueryT extends IQuery> = (
    Query<{
        readonly _distinct : false;
        readonly _sqlCalcFoundRows : false;

        readonly _joins : undefined;
        readonly _parentJoins : (
            Extract<QueryT["_joins"], IJoin[]>[number] |
            Extract<QueryT["_parentJoins"], IJoin[]>[number]
        )[];
        readonly _selects : undefined;
        readonly _where : undefined;

        readonly _grouped : undefined;
        readonly _having : undefined;

        readonly _orders : undefined;
        readonly _limit : undefined;

        readonly _unions : undefined;
        readonly _unionOrders : undefined;
        readonly _unionLimit : undefined;

        readonly _mapDelegate : undefined;
    }>
);
export function subQuery<QueryT extends IQuery> (
    query : QueryT
) : SubQueryResult<QueryT> {
    const parentJoins : IJoin[] = [];
    if (query._parentJoins != undefined) {
        parentJoins.push(...query._parentJoins);
    }
    if (query._joins != undefined) {
        parentJoins.push(...query._joins);
    }
    return new Query({
        _distinct : false,
        _sqlCalcFoundRows : false,

        _joins : undefined,
        _parentJoins : parentJoins,
        _selects : undefined,
        _where : undefined,

        _grouped : undefined,
        _having : undefined,

        _orders : undefined,
        _limit : undefined,

        _unions : undefined,
        _unionOrders : undefined,
        _unionLimit : undefined,

        _mapDelegate : undefined,
    });
}