import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { ColumnUtil } from "../../../column";
import { IAnonymousTypedExpr } from "../../../expr";
export declare type WhereDelegate<QueryT extends AfterFromClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQueryJoins<QueryT>>, query: QueryT) => RawExpr<boolean>);
export declare type Where<QueryT extends AfterFromClause> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: QueryT["_selects"];
    readonly _where: IAnonymousTypedExpr<boolean>;
    readonly _grouped: QueryT["_grouped"];
    readonly _having: QueryT["_having"];
    readonly _orders: QueryT["_orders"];
    readonly _limit: QueryT["_limit"];
    readonly _unions: QueryT["_unions"];
    readonly _unionOrders: QueryT["_unionOrders"];
    readonly _unionLimit: QueryT["_unionLimit"];
    readonly _mapDelegate: QueryT["_mapDelegate"];
}>);
export declare type AssertValidWhereDelegate<QueryT extends AfterFromClause, WhereDelegateT extends WhereDelegate<QueryT>> = (WhereDelegateT & (ColumnRefUtil.FromQueryJoins<QueryT> extends RawExprUtil.UsedRef<ReturnType<WhereDelegateT>> ? unknown : ["WHERE expression contains some invalid columns; the following are not allowed:", Exclude<ColumnUtil.FromColumnRef<RawExprUtil.UsedRef<ReturnType<WhereDelegateT>>>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>>]));
export declare function where<QueryT extends AfterFromClause, WhereDelegateT extends WhereDelegate<QueryT>>(query: QueryT, delegate: AssertValidWhereDelegate<QueryT, WhereDelegateT>): Where<QueryT>;
//# sourceMappingURL=where.d.ts.map