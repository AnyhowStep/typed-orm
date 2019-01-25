import { IQuery, Query } from "../../query";
import { IAliasedTable } from "../../../aliased-table";
import { IJoin } from "../../../join";
import { AssertValidJoinTargetImpl } from "../predicate";
import { NonEmptyTuple } from "../../../tuple";
export declare type ToParentJoins<NullableT extends boolean, AliasedTableT extends IAliasedTable> = (AliasedTableT extends IAliasedTable ? IJoin<{
    aliasedTable: AliasedTableT;
    columns: AliasedTableT["columns"];
    nullable: NullableT;
}> : never);
export declare type RequireParentJoins<QueryT extends IQuery, NullableT extends boolean, ArrT extends NonEmptyTuple<IAliasedTable>> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: (QueryT["_parentJoins"] extends IJoin[] ? (QueryT["_parentJoins"][number] | ToParentJoins<NullableT, ArrT[number]>)[] : ToParentJoins<NullableT, ArrT[number]>[]);
    readonly _selects: QueryT["_selects"];
    readonly _where: QueryT["_where"];
    readonly _grouped: QueryT["_grouped"];
    readonly _having: QueryT["_having"];
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare type AssertValidParentJoins<QueryT extends IQuery, ArrT extends NonEmptyTuple<IAliasedTable>> = (ArrT & AssertValidJoinTargetImpl<QueryT, ArrT[number]>);
export declare function requireParentJoins<QueryT extends IQuery, NullableT extends boolean, ArrT extends NonEmptyTuple<IAliasedTable>>(query: QueryT, nullable: NullableT, ...arr: AssertValidParentJoins<QueryT, ArrT>): (RequireParentJoins<QueryT, NullableT, ArrT>);
