import { ToUnknownIfAllFieldsNever } from "../../../type";
import { Query } from "../../query";
import { BeforeUnionClause } from "../predicate";
import { ColumnRef, ColumnRefUtil } from "../../../column-ref";
import { ColumnMap } from "../../../column-map";
import { NonEmptyTuple, TupleUtil } from "../../../tuple";
import { SelectItem } from "../../../select-item";
import { IExprSelectItem } from "../../../expr-select-item";
import { IColumn, ColumnUtil } from "../../../column";
import { ColumnIdentifierUtil } from "../../../column-identifier";
export declare type SelectDelegate<QueryT extends BeforeUnionClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQueryJoins<QueryT>>, query: QueryT) => NonEmptyTuple<SelectItem>);
export declare type Select<QueryT extends BeforeUnionClause, SelectDelegateT extends SelectDelegate<QueryT>> = (Query<{
    readonly _distinct: QueryT["_distinct"];
    readonly _sqlCalcFoundRows: QueryT["_sqlCalcFoundRows"];
    readonly _joins: QueryT["_joins"];
    readonly _parentJoins: QueryT["_parentJoins"];
    readonly _selects: (QueryT["_selects"] extends SelectItem[] ? TupleUtil.Concat<QueryT["_selects"], ReturnType<SelectDelegateT>> : ReturnType<SelectDelegateT>);
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
export declare type AssertValidSelectDelegateImpl<QueryT extends BeforeUnionClause, SelectDelegateT extends SelectDelegate<QueryT>> = (ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends IExprSelectItem ? (ColumnUtil.AssertValidUsed<ReturnType<SelectDelegateT>[index]["usedColumns"][number], Extract<ColumnUtil.FromQueryJoins<QueryT>, IColumn>> extends never ? never : ["Invalid IExprSelectItem", ColumnUtil.AssertValidUsed<ReturnType<SelectDelegateT>[index]["usedColumns"][number], Extract<ColumnUtil.FromQueryJoins<QueryT>, IColumn>>]) : never);
}> & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends IColumn ? (ReturnType<SelectDelegateT>[index] extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>> ? never : ["Invalid IColumn", ReturnType<SelectDelegateT>[index]]) : never);
}> & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends ColumnMap ? (ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>> ? never : ["Invalid ColumnMap", Exclude<ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>>]) : never);
}> & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends SelectItem ? (Extract<ColumnIdentifierUtil.FromSelectItem<ReturnType<SelectDelegateT>[index]>, ColumnIdentifierUtil.FromSelectItemArrayIgnoreIndex<ReturnType<SelectDelegateT>, index>> extends never ? never : ["Duplicate columns in SELECT clause", Extract<ColumnIdentifierUtil.FromSelectItem<ReturnType<SelectDelegateT>[index]>, ColumnIdentifierUtil.FromSelectItemArrayIgnoreIndex<ReturnType<SelectDelegateT>, index>>]) : never);
}> & (QueryT["_selects"] extends SelectItem[] ? (ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends SelectItem ? (Extract<ColumnIdentifierUtil.FromSelectItem<ReturnType<SelectDelegateT>[index]>, ColumnIdentifierUtil.FromSelectItem<QueryT["_selects"][number]>> extends never ? never : ["Duplicate columns in SELECT clause; consider aliasing", Extract<ColumnIdentifierUtil.FromSelectItem<ReturnType<SelectDelegateT>[index]>, ColumnIdentifierUtil.FromSelectItem<QueryT["_selects"][number]>>]) : never);
}>) : unknown) & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends IExprSelectItem ? (ColumnUtil.FromExprSelectItem<ReturnType<SelectDelegateT>[index]> extends ColumnIdentifierUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>> ? ["IExprSelectItem cannot hide columns in FROM/JOIN clause", Extract<ColumnUtil.FromExprSelectItem<ReturnType<SelectDelegateT>[index]>, ColumnIdentifierUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>>] : never) : never);
}> & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends ColumnRef ? (ColumnUtil.FromColumnRef<ReturnType<SelectDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>> ? never : ["Invalid ColumnRef", Exclude<ColumnUtil.FromColumnRef<ReturnType<SelectDelegateT>[index]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>>]) : never);
}>);
export declare type AssertValidSelectDelegate<QueryT extends BeforeUnionClause, SelectDelegateT extends SelectDelegate<QueryT>> = (SelectDelegateT & AssertValidSelectDelegateImpl<QueryT, SelectDelegateT>);
export declare function select<QueryT extends BeforeUnionClause, SelectDelegateT extends SelectDelegate<QueryT>>(query: QueryT, delegate: AssertValidSelectDelegate<QueryT, SelectDelegateT>): Select<QueryT, SelectDelegateT>;
