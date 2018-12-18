import { Query } from "../../query";
import { BeforeUnionClause, BeforeSelectClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { IExpr, ExprUtil } from "../../../expr";
import { AssertValidSelectDelegateImpl } from "./select";
export declare type SelectExprDelegate<QueryT extends BeforeUnionClause & BeforeSelectClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQueryJoins<QueryT>>) => IExpr);
export declare type SelectExpr<QueryT extends BeforeUnionClause & BeforeSelectClause, SelectDelegateT extends SelectExprDelegate<QueryT>> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: [ExprUtil.As<ReturnType<SelectDelegateT>, "value">];
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
export declare type AssertValidSelectExprDelegate<QueryT extends BeforeUnionClause & BeforeSelectClause, SelectDelegateT extends SelectExprDelegate<QueryT>> = (SelectDelegateT & AssertValidSelectDelegateImpl<QueryT, (columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQueryJoins<QueryT>>) => [ExprUtil.As<ReturnType<SelectDelegateT>, "value">]>);
export declare function selectExpr<QueryT extends BeforeUnionClause & BeforeSelectClause, SelectDelegateT extends SelectExprDelegate<QueryT>>(query: QueryT, delegate: AssertValidSelectExprDelegate<QueryT, SelectDelegateT>): SelectExpr<QueryT, SelectDelegateT>;
//# sourceMappingURL=select-expr.d.ts.map