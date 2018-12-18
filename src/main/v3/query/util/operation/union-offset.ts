import {IQuery, Query, LimitData} from "../../query";
import {MAX_SAFE_INTEGER} from "../../../type";

export type UnionOffset<
    QueryT extends IQuery,
    OffsetT extends number
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
            QueryT["_unionLimit"] extends LimitData ?
            {
                readonly maxRowCount : QueryT["_unionLimit"]["maxRowCount"],
                readonly offset : OffsetT,
            } :
            {
                readonly maxRowCount : MAX_SAFE_INTEGER,
                readonly offset : OffsetT,
            }
        ),

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);

export function unionOffset<
    QueryT extends IQuery,
    OffsetT extends number
> (
    query : QueryT,
    offset : OffsetT
) : UnionOffset<QueryT, OffsetT> {
    if (offset < 0) {
        throw new Error(`offset cannot be negative`);
    }
    if (offset !== Math.floor(offset)) {
        throw new Error(`offset must be an integer`);
    }
    return new Query(
        {
            ...query,
            _unionLimit : (
                query._unionLimit == undefined ?
                {
                    maxRowCount : MAX_SAFE_INTEGER,
                    offset,
                } :
                {
                    maxRowCount : query._unionLimit.maxRowCount,
                    offset,
                }
            )
        }
    ) as IQuery as UnionOffset<QueryT, OffsetT>;
}