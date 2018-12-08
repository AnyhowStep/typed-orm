import { Query } from "../../query";
import { Join } from "../../../join";
import { BeforeFromClause, AssertUniqueJoinTarget } from "../predicate";
import { IAliasedTable } from "../../../aliased-table";
export declare type From<QueryT extends BeforeFromClause, AliasedTableT extends IAliasedTable> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: Join<{
        aliasedTable: AliasedTableT;
        columns: AliasedTableT["columns"];
        nullable: false;
    }>[];
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
export declare function from<QueryT extends BeforeFromClause, AliasedTableT extends IAliasedTable>(query: QueryT, aliasedTable: AssertUniqueJoinTarget<QueryT, AliasedTableT>): (From<QueryT, AliasedTableT>);
//# sourceMappingURL=from.d.ts.map