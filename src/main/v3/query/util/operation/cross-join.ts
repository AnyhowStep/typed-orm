import {Query} from "../../query";
import {AfterFromClause, AssertUniqueJoinTarget, assertUniqueJoinTarget} from "../predicate";
import {IAliasedTable} from "../../../aliased-table";
import {Join, JoinType} from "../../../join";

/*
    Gives the Cartesian product.
    Example:
    |      Table A      |
    | columnA | columnB |
    | 1       | hello   |
    | 2       | world   |

    |      Table B      |
    | columnC | columnD |
    | qwerty  | 321     |
    | stuff   | 654     |
    | yellow  | 987     |

    SELECT
        *
    FROM
        `Table A`
    CROSS JOIN
        `Table B`

    Will give you:
    | columnA | columnB | columnC | columnD |
    | 1       | hello   | qwerty  | 321     |
    | 1       | hello   | stuff   | 654     |
    | 1       | hello   | yellow  | 987     |
    | 2       | world   | qwerty  | 321     |
    | 2       | world   | stuff   | 654     |
    | 2       | world   | yellow  | 987     |

    { a, b } x { 1, 2, 3 } = { (a,1), (a,2), (a,3), (b,1), (b,2), (b,3) }
*/
export type CrossJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : (
            QueryT["_joins"][number] |
            Join<{
                aliasedTable : AliasedTableT,
                columns : AliasedTableT["columns"],
                nullable : false,
            }>
        )[],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);
export function crossJoin<
    QueryT extends AfterFromClause,
    AliasedTableT extends IAliasedTable
> (
    query : QueryT,
    aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>
) : (
    CrossJoin<QueryT, AliasedTableT>
) {
    if (query._joins == undefined) {
        throw new Error(`Cannot CROSS JOIN before FROM clause`);
    }
    assertUniqueJoinTarget(query, aliasedTable);

    const {
        _distinct,
        _sqlCalcFoundRows,

        _parentJoins,
        _selects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;
    return new Query({
        _distinct,
        _sqlCalcFoundRows,
        _joins : [
            ...query._joins,
            new Join(
                {
                    aliasedTable,
                    columns : aliasedTable.columns,
                    nullable : false,
                },
                JoinType.CROSS,
                [],
                [],
            ),
        ],
        _parentJoins,
        _selects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    });
}