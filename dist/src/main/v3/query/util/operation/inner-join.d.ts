import { Query } from "../../query";
import { AfterFromClause, AssertValidJoinTarget } from "../predicate";
import { JoinFromDelegate, JoinToDelegate } from "./join-delegate";
import { IAliasedTable } from "../../../aliased-table";
import { Join } from "../../../join";
export declare type InnerJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (Query<{
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
export declare function innerJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>): (InnerJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=inner-join.d.ts.map