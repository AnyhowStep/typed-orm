import {IQuery, Query, LimitData} from "../../query";
import {MAX_SAFE_INTEGER} from "../../../type";

export type Offset<
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
        readonly _limit : (
            QueryT["_limit"] extends LimitData ?
            {
                readonly maxRowCount : QueryT["_limit"]["maxRowCount"],
                readonly offset : OffsetT,
            } :
            {
                readonly maxRowCount : MAX_SAFE_INTEGER,
                readonly offset : OffsetT,
            }
        ),

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);

export function offset<
    QueryT extends IQuery,
    OffsetT extends number
> (
    query : QueryT,
    offset : OffsetT
) : Offset<QueryT, OffsetT> {
    if (offset < 0) {
        throw new Error(`offset cannot be negative`);
    }
    if (offset !== Math.floor(offset)) {
        throw new Error(`offset must be an integer`);
    }
    return new Query(
        {
            ...query,
            _limit : (
                query._limit == undefined ?
                {
                    maxRowCount : MAX_SAFE_INTEGER,
                    offset,
                } :
                {
                    maxRowCount : query._limit.maxRowCount,
                    offset,
                }
            )
        }
    ) as IQuery as Offset<QueryT, OffsetT>;
}