import * as sd from "schema-decorator";
import { QueryUtil } from "./query";
import { IAliasedTable } from "./aliased-table";
import { ColumnMapUtil } from "./column-map";
import { IColumn } from "./column";
import { IExprSelectItem } from "./expr-select-item";
import { QueryTree } from "./query-tree";
export interface TableSubqueryData {
    readonly query: QueryUtil.AfterSelectClause;
    readonly alias: string;
}
export interface ITableSubquery<DataT extends TableSubqueryData = TableSubqueryData> extends IAliasedTable<{
    readonly alias: DataT["alias"];
    readonly name: DataT["alias"];
    readonly columns: ColumnMapUtil.FromSelectItemArray<DataT["query"]["_selects"]>;
}> {
    readonly query: DataT["query"];
    readonly alias: DataT["alias"];
}
export declare namespace TableSubquery {
    type ToColumn<ItemT extends TableSubquery.SingleValueOrEmpty<any>> = (IColumn<{
        readonly tableAlias: ItemT["alias"];
        readonly name: TableSubquery.ColumnName<ItemT>;
        readonly assertDelegate: TableSubquery.AssertDelegate<ItemT>;
    }>);
    function isTableSubquery(raw: any): raw is ITableSubquery;
    type SingleValueOrEmpty<TypeT> = (ITableSubquery<{
        readonly query: (QueryUtil.OneSelectItemQuery<TypeT> & QueryUtil.ZeroOrOneRowQuery);
        readonly alias: string;
    }>);
    function isSingleValueOrEmpty(raw: any): raw is SingleValueOrEmpty<any>;
    type SingleValue<TypeT> = (ITableSubquery<{
        readonly query: (QueryUtil.OneSelectItemQuery<TypeT> & QueryUtil.OneRowQuery);
        readonly alias: string;
    }>);
    function isSingleValue(raw: any): raw is SingleValue<any>;
    type ColumnName<T extends SingleValueOrEmpty<any>> = (T["query"]["_selects"]["0"] extends IColumn ? Extract<T["query"]["_selects"]["0"], IColumn>["name"] : T["query"]["_selects"]["0"] extends IExprSelectItem ? Extract<T["query"]["_selects"]["0"], IExprSelectItem>["alias"] : never);
    function columnName<T extends SingleValueOrEmpty<any>>(t: T): ColumnName<T>;
    type TypeOf<T extends SingleValueOrEmpty<any>> = ((T extends SingleValue<any> ? never : null) | (T["query"]["_selects"]["0"] extends IColumn ? ReturnType<T["query"]["_selects"]["0"]["assertDelegate"]> : T["query"]["_selects"]["0"] extends IExprSelectItem ? ReturnType<T["query"]["_selects"]["0"]["assertDelegate"]> : never));
    type AssertDelegate<T extends SingleValueOrEmpty<any>> = (sd.AssertDelegate<TypeOf<T>>);
    function assertDelegate<T extends SingleValueOrEmpty<any>>(t: T): (AssertDelegate<T>);
    function queryTree(_tableSubquery: ITableSubquery | SingleValueOrEmpty<any>): QueryTree;
}
//# sourceMappingURL=table-subquery.d.ts.map