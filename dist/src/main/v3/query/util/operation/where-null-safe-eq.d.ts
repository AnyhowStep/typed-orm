import * as sd from "schema-decorator";
import { Query } from "../../query";
import { AfterFromClause, BeforeSelectClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil, Column } from "../../../column";
import { IAnonymousTypedExpr } from "../../../expr";
import { JoinArrayUtil } from "../../../join-array";
import { PrimitiveExpr } from "../../../primitive-expr";
export declare type WhereNullSafeEqDelegate<QueryT extends AfterFromClause & BeforeSelectClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromJoinArray<QueryT["_joins"]>>) => (ColumnUtil.FromColumnRef<ColumnRefUtil.FromJoinArray<QueryT["_joins"]>>));
export declare type WhereNullSafeEq<QueryT extends AfterFromClause & BeforeSelectClause, DelegateT extends WhereNullSafeEqDelegate<QueryT>, ValueT extends PrimitiveExpr> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: (JoinArrayUtil.ReplaceColumn<QueryT["_joins"], Column<{
        tableAlias: ReturnType<DelegateT>["tableAlias"];
        name: ReturnType<DelegateT>["name"];
        assertDelegate: sd.AssertDelegate<ValueT>;
    }>>);
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
export declare type AssertValidNullSafeEqTarget<QueryT extends AfterFromClause & BeforeSelectClause, DelegateT extends WhereNullSafeEqDelegate<QueryT>, ValueT extends PrimitiveExpr> = (ValueT & (ValueT extends ReturnType<ReturnType<DelegateT>["assertDelegate"]> ? unknown : [ValueT, "does not extend", ReturnType<ReturnType<DelegateT>["assertDelegate"]>]));
export declare function whereNullSafeEq<QueryT extends AfterFromClause & BeforeSelectClause, DelegateT extends WhereNullSafeEqDelegate<QueryT>, ValueT extends PrimitiveExpr>(query: QueryT, delegate: DelegateT, value: AssertValidNullSafeEqTarget<QueryT, DelegateT, ValueT>): WhereNullSafeEq<QueryT, DelegateT, ValueT>;
//# sourceMappingURL=where-null-safe-eq.d.ts.map