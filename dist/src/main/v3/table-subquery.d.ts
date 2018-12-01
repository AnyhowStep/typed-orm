import * as sd from "schema-decorator";
import { Query } from "./query";
import { IAliasedTable } from "./aliased-table";
import { ColumnMapUtil } from "./column-map";
import { IColumn } from "./column";
import { IExprSelectItem } from "./expr-select-item";
import { QueryStringTree } from "./query-string-tree";
import { AnonymousTypedSingleValueSelectItem } from "./select-item";
export interface TableSubqueryData {
    readonly query: Query.AfterSelectClause;
    readonly alias: string;
}
export interface ITableSubquery<DataT extends TableSubqueryData = TableSubqueryData> extends IAliasedTable<{
    readonly alias: DataT["alias"];
    readonly name: DataT["alias"];
    readonly columns: ColumnMapUtil.FromSelectItemArray<DataT["query"]["selects"]>;
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
        readonly query: (Query.AfterSelectClause & Query.ZeroOrOneRowQuery & {
            selects: [AnonymousTypedSingleValueSelectItem<TypeT>];
        });
        readonly alias: string;
    }>);
    function isSingleValueOrEmpty(raw: any): raw is SingleValueOrEmpty<any>;
    type SingleValue<TypeT> = (ITableSubquery<{
        readonly query: (Query.AfterSelectClause & Query.OneRowQuery & {
            selects: [AnonymousTypedSingleValueSelectItem<TypeT>];
        });
        readonly alias: string;
    }>);
    function isSingleValue(raw: any): raw is SingleValue<any>;
    type ColumnName<T extends SingleValueOrEmpty<any>> = (T["query"]["selects"]["0"] extends IColumn ? Extract<T["query"]["selects"]["0"], IColumn>["name"] : T["query"]["selects"]["0"] extends IExprSelectItem ? Extract<T["query"]["selects"]["0"], IExprSelectItem>["alias"] : never);
    function columnName<T extends SingleValueOrEmpty<any>>(t: T): ColumnName<T>;
    type TypeOf<T extends SingleValueOrEmpty<any>> = ((T extends SingleValue<any> ? never : null) | (T["query"]["selects"]["0"] extends IColumn ? ReturnType<T["query"]["selects"]["0"]["assertDelegate"]> : T["query"]["selects"]["0"] extends IExprSelectItem ? ReturnType<T["query"]["selects"]["0"]["assertDelegate"]> : never));
    type AssertDelegate<T extends SingleValueOrEmpty<any>> = (sd.AssertDelegate<TypeOf<T>>);
    function assertDelegate<T extends SingleValueOrEmpty<any>>(t: T): (AssertDelegate<T>);
    function queryStringTree(_tableSubquery: ITableSubquery | SingleValueOrEmpty<any>): QueryStringTree;
}
//# sourceMappingURL=table-subquery.d.ts.map