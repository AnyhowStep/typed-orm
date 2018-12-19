"use strict";
/*import {IQuery, Query} from "../../query";
import {IAliasedTable} from "../../../aliased-table";
import {IJoin} from "../../../join";
import {AssertUniqueJoinTarget} from "../predicate";

export type ToParentJoins<
    NullableT extends boolean,
    AliasedTableT extends IAliasedTable
> = (
    AliasedTableT extends IAliasedTable ?
    IJoin<{
        aliasedTable : AliasedTableT,
        columns : AliasedTableT["columns"],
        nullable : NullableT,
    }> :
    never
);

export type RequireParentJoins<
    QueryT extends IQuery,
    NullableT extends boolean,
    ArrT extends IAliasedTable[]
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : (
            QueryT["_parentJoins"] extends IJoin[] ?
            (
                QueryT["_parentJoins"][number] |
                ToParentJoins<NullableT, ArrT[number]>
            )[] :
            ToParentJoins<NullableT, ArrT[number]>[]
        ),
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

export function requireParentJoins<
    QueryT extends IQuery,
    NullableT extends boolean,
    ArrT extends IAliasedTable[],
> (
    query : QueryT,
    nullable : NullableT,
    ...arr : AssertUniqueJoinTarget<QueryT, ArrT[number]>[]
) : (

) {

}*/ 
//# sourceMappingURL=require-parent-joins.js.map