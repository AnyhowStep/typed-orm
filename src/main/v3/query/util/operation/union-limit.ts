import {IQuery, Query, LimitData} from "../../query";

export type UnionLimit<
    QueryT extends IQuery,
    MaxRowCountT extends number
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : (
            Extract<
                QueryT["_unionLimit"] extends LimitData ?
                {
                    readonly maxRowCount : MaxRowCountT,
                    readonly offset : QueryT["_unionLimit"]["offset"],
                } :
                {
                    readonly maxRowCount : MaxRowCountT,
                    readonly offset : 0,
                },
                LimitData
            >
        ),

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);

export function unionLimit<
    QueryT extends IQuery,
    MaxRowCountT extends number
> (
    query : QueryT,
    maxRowCount : MaxRowCountT
) : UnionLimit<QueryT, MaxRowCountT> {
    if (maxRowCount < 0) {
        throw new Error(`maxRowCount cannot be negative`);
    }
    if (maxRowCount !== Math.floor(maxRowCount)) {
        throw new Error(`maxRowCount must be an integer`);
    }
    return new Query(
        {
            ...query,
            _unionLimit : (
                query._unionLimit == undefined ?
                {
                    maxRowCount,
                    offset : 0,
                } :
                {
                    maxRowCount,
                    offset : query._unionLimit.offset,
                }
            )
        }
    ) as IQuery as UnionLimit<QueryT, MaxRowCountT>;
}