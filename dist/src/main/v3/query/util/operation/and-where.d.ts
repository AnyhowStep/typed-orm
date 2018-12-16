import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { RawExpr, RawExprUtil } from "../../../raw-expr";
import { ColumnUtil } from "../../../column";
import { IAnonymousTypedExpr } from "../../../expr";
export declare type AndWhereDelegate<QueryT extends AfterFromClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQueryJoins<QueryT>>, query: QueryT) => RawExpr<boolean>);
export declare type AndWhere<QueryT extends AfterFromClause> = (Query<{
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
export declare type AssertValidAndWhereDelegate<QueryT extends AfterFromClause, AndWhereDelegateT extends AndWhereDelegate<QueryT>> = (AndWhereDelegateT & (ColumnRefUtil.FromQueryJoins<QueryT> extends RawExprUtil.UsedRef<ReturnType<AndWhereDelegateT>> ? unknown : ["WHERE expression contains some invalid columns; the following are not allowed:", Exclude<ColumnUtil.FromColumnRef<RawExprUtil.UsedRef<ReturnType<AndWhereDelegateT>>>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>>]));
export declare function andWhere<QueryT extends AfterFromClause, AndWhereDelegateT extends AndWhereDelegate<QueryT>>(query: QueryT, delegate: AssertValidAndWhereDelegate<QueryT, AndWhereDelegateT>): AndWhere<QueryT>;
//# sourceMappingURL=and-where.d.ts.map