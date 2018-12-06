import { ToUnknownIfAllFieldsNever } from "../../../type";
import { Query } from "../../query";
import { BeforeUnionClause } from "../predicate";
import { ColumnRefUtil } from "../../../column-ref";
import { ColumnMap } from "../../../column-map";
import { NonEmptyTuple, TupleUtil } from "../../../tuple";
import { SelectItem } from "../../../select-item";
import { IExprSelectItem } from "../../../expr-select-item";
import { IColumn, ColumnUtil } from "../../../column";
import { ColumnIdentifierUtil } from "../../../column-identifier";
export declare type SelectDelegate<QueryT extends BeforeUnionClause> = ((columns: ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>) => NonEmptyTuple<SelectItem>);
export declare type Select<QueryT extends BeforeUnionClause, SelectDelegateT extends SelectDelegate<QueryT>> = (Query<{
    readonly joins: QueryT["joins"];
    readonly parentJoins: QueryT["parentJoins"];
    readonly unions: QueryT["unions"];
    readonly selects: (QueryT["selects"] extends SelectItem[] ? TupleUtil.Concat<QueryT["selects"], ReturnType<SelectDelegateT>> : ReturnType<SelectDelegateT>);
    readonly limit: QueryT["limit"];
    readonly unionLimit: QueryT["unionLimit"];
}>);
export declare function select<QueryT extends BeforeUnionClause, SelectDelegateT extends SelectDelegate<QueryT>>(query: QueryT, delegate: (SelectDelegateT & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends IExprSelectItem ? (ColumnRefUtil.FromQuery<QueryT> extends ReturnType<SelectDelegateT>[index]["usedRef"] ? never : ["Invalid IExprSelectItem", Exclude<ColumnUtil.FromColumnRef<ReturnType<SelectDelegateT>[index]["usedRef"]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>>>] | void) : never);
}> & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends IColumn ? (ReturnType<SelectDelegateT>[index] extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>> ? never : ["Invalid IColumn", ReturnType<SelectDelegateT>[index]]) : never);
}> & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends ColumnMap ? (ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>> ? never : ["Invalid ColumnMap", Exclude<ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]>, ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>>>] | void) : never);
}> & (QueryT["selects"] extends SelectItem[] ? (ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends SelectItem ? (Extract<ColumnIdentifierUtil.FromSelectItem<ReturnType<SelectDelegateT>[index]>, ColumnIdentifierUtil.FromSelectItem<QueryT["selects"][number]>> extends never ? never : ["Duplicate columns in SELECT clause; consider aliasing", Extract<ColumnIdentifierUtil.FromSelectItem<ReturnType<SelectDelegateT>[index]>, ColumnIdentifierUtil.FromSelectItem<QueryT["selects"][number]>>] | void) : never);
}> & ToUnknownIfAllFieldsNever<{
    [index in Extract<keyof ReturnType<SelectDelegateT>, string>]: (ReturnType<SelectDelegateT>[index] extends SelectItem ? (Extract<ColumnIdentifierUtil.FromSelectItem<ReturnType<SelectDelegateT>[index]>, ColumnIdentifierUtil.FromSelectItemArrayIgnoreIndex<ReturnType<SelectDelegateT>, index>> extends never ? never : ["Duplicate columns in SELECT clause", Extract<ColumnIdentifierUtil.FromSelectItem<ReturnType<SelectDelegateT>[index]>, ColumnIdentifierUtil.FromSelectItemArrayIgnoreIndex<ReturnType<SelectDelegateT>, index>>] | void) : never);
}>) : unknown))): Select<QueryT, SelectDelegateT>;
//# sourceMappingURL=select.d.ts.map