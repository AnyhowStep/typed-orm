import { Query } from "../../../query";
import { AfterFromClause, CanWidenColumnTypes, AssertValidJoinTarget } from "../../predicate";
import { JoinFromDelegate, JoinToDelegate } from "./join";
import { IAliasedTable } from "../../../../aliased-table";
import { Join, JoinUtil } from "../../../../join";
export declare type RightJoin<QueryT extends AfterFromClause & CanWidenColumnTypes, AliasedTableT extends IAliasedTable> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: (JoinUtil.Array.ToNullable<QueryT["_joins"]>[number] | Join<{
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
export declare function rightJoin<QueryT extends AfterFromClause & CanWidenColumnTypes, AliasedTableT extends IAliasedTable, FromDelegateT extends JoinFromDelegate<QueryT["_joins"]>>(query: QueryT, aliasedTable: AssertValidJoinTarget<QueryT, AliasedTableT>, fromDelegate: FromDelegateT, toDelegate: JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>): (RightJoin<QueryT, AliasedTableT>);
