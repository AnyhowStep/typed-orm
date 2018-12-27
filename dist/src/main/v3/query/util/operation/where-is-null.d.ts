import * as sd from "schema-decorator";
import { Query } from "../../query";
import { AfterFromClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnUtil, Column } from "../../../column";
import { IAnonymousTypedExpr } from "../../../expr";
import { JoinArrayUtil } from "../../../join-array";
export declare type WhereIsNullDelegate<QueryT extends AfterFromClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromJoinArray<QueryT["_joins"]>>) => (ColumnUtil.ExtractNullable<ColumnUtil.FromColumnRef<ColumnRefUtil.FromJoinArray<QueryT["_joins"]>>>));
export declare type WhereIsNull<QueryT extends AfterFromClause, DelegateT extends WhereIsNullDelegate<QueryT>> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: (JoinArrayUtil.ReplaceColumn<QueryT["_joins"], Column<{
        tableAlias: ReturnType<DelegateT>["tableAlias"];
        name: ReturnType<DelegateT>["name"];
        assertDelegate: sd.AssertDelegate<null>;
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
export declare function whereIsNull<QueryT extends AfterFromClause, DelegateT extends WhereIsNullDelegate<QueryT>>(query: QueryT, delegate: DelegateT): WhereIsNull<QueryT, DelegateT>;
//# sourceMappingURL=where-is-null.d.ts.map