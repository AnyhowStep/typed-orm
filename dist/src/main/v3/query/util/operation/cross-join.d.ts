import { Query } from "../../query";
import { AfterFromClause, AssertValidJoinTarget } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
import { Join } from "../../../join";
export declare type CrossJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: (QueryT["_joins"][number] | Join<{
        aliasedTable: AliasedTableT;
        columns: AliasedTableT["columns"];
        nullable: false;
    }>)[];
    readonly _parentJoins: QueryT["_parentJoins"];
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
export declare function crossJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>): (CrossJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=cross-join.d.ts.map