import * as sd from "schema-decorator";
import { Query } from "../../query";
import { AfterFromClause, BeforeSelectClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil, Column } from "../../../column";
import { IAnonymousTypedExpr } from "../../../expr";
import { JoinArrayUtil } from "../../../join-array";
export declare type WhereIsNotNullDelegate<QueryT extends AfterFromClause & BeforeSelectClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromJoinArray<QueryT["_joins"]>>) => (ColumnUtil.ExtractNullable<ColumnUtil.FromColumnRef<ColumnRefUtil.FromJoinArray<QueryT["_joins"]>>>));
export declare type WhereIsNotNull<QueryT extends AfterFromClause & BeforeSelectClause, DelegateT extends WhereIsNotNullDelegate<QueryT>> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: (JoinArrayUtil.ReplaceColumn<QueryT["_joins"], Column<{
        tableAlias: ReturnType<DelegateT>["tableAlias"];
        name: ReturnType<DelegateT>["name"];
        assertDelegate: sd.AssertDelegate<Exclude<ReturnType<ReturnType<DelegateT>["assertDelegate"]>, null>>;
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
export declare function whereIsNotNull<QueryT extends AfterFromClause & BeforeSelectClause, DelegateT extends WhereIsNotNullDelegate<QueryT>>(query: QueryT, delegate: DelegateT): WhereIsNotNull<QueryT, DelegateT>;
//# sourceMappingURL=and-where-is-not-null.d.ts.map