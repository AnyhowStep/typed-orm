import { Query } from "../../query";
import { AfterFromClause, AssertUniqueJoinTarget } from "../predicate";
import { JoinFromDelegate, JoinToDelegate } from "./join-delegate";
import { IAliasedTable } from "../../../aliased-table";
import { Join } from "../../../join";
import { JoinArrayUtil } from "../../../join-array";
export declare type RightJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: (JoinArrayUtil.ToNullable<QueryT["_joins"]>[number] | Join<{
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
export declare function rightJoin<QueryT extends AfterFromClause, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>): (RightJoin<QueryT, AliasedTableT>);
//# sourceMappingURL=right-join.d.ts.map