import { AliasedTable, AnyAliasedTable } from "./aliased-table";
import { ITable } from "./table";
export declare type TableAlias<TableT extends AnyAliasedTable> = (TableT extends ITable<infer Alias, any, any, any> ? Alias : TableT extends AliasedTable<infer Alias, any, any> ? Alias : never);
export declare type TableName<TableT extends AnyAliasedTable> = (TableT extends ITable<any, infer Name, any, any> ? Name : TableT extends AliasedTable<any, infer Name, any> ? Name : never);
export declare type TableColumns<TableT extends AnyAliasedTable> = (TableT extends ITable<any, any, infer Columns, any> ? Columns : TableT extends AliasedTable<any, any, infer Columns> ? Columns : never);
export declare type TableToReference<TableT extends AnyAliasedTable> = (TableT extends ITable<any, any, infer ColumnsT, any> ? {
    [alias in TableAlias<TableT>]: {
        [name in keyof ColumnsT]: TableT["columns"][name];
    };
} : TableT extends AliasedTable<any, any, infer ColumnsT> ? {
    [alias in TableAlias<TableT>]: {
        [name in keyof ColumnsT]: TableT["columns"][name];
    };
} : never);