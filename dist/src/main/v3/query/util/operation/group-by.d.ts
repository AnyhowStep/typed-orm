import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { NonEmptyTuple } from "../../../tuple";
import { ColumnIdentifier, ColumnIdentifierUtil } from "../../../column-identifier";
import { ColumnIdentifierRefUtil } from "../../../column-identifier-ref";
export declare type GroupByDelegate<QueryT extends AfterFromClause> = ((columns: ColumnIdentifierRefUtil.ToConvenient<ColumnIdentifierRefUtil.FromQuery<QueryT>>) => NonEmptyTuple<ColumnIdentifierUtil.FromQuery<QueryT>>);
export declare type GroupBy<QueryT extends AfterFromClause> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: QueryT["_where"];
    readonly _grouped: ColumnIdentifier[];
    readonly _having: QueryT["_having"];
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare type AssertValidGroupByDelegate<QueryT extends AfterFromClause, GroupByDelegateT extends GroupByDelegate<QueryT>> = (GroupByDelegateT & (ReturnType<GroupByDelegateT>[number] extends ColumnIdentifierUtil.FromQuery<QueryT> ? unknown : ["Invalid GROUP BY columns", ReturnType<GroupByDelegateT>, ColumnIdentifierUtil.FromQuery<QueryT>, Exclude<ReturnType<GroupByDelegateT>[number], ColumnIdentifierUtil.FromQuery<QueryT>>]));
export declare function groupBy<QueryT extends AfterFromClause, GroupByDelegateT extends GroupByDelegate<QueryT>>(query: QueryT, delegate: AssertValidGroupByDelegate<QueryT, GroupByDelegateT>): GroupBy<QueryT>;
//# sourceMappingURL=group-by.d.ts.map