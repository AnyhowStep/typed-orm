import { AnyTable } from "./table";
import { RawExprNoUsedRef } from "./raw-expr";
import { PooledDatabase } from "./PooledDatabase";
import { TableParentCollectionUtil } from "./table-parent-collection";
export declare type PolymorphicRawInsertValueRow<TableT extends AnyTable> = ({
    [name in TableParentCollectionUtil.RequiredColumnNames<TableT>]: (RawExprNoUsedRef<TableParentCollectionUtil.ColumnType<TableT, name>>);
} & {
    [name in TableParentCollectionUtil.OptionalColumnNames<TableT>]?: (RawExprNoUsedRef<TableParentCollectionUtil.ColumnType<TableT, name>>);
});
export declare type PolymorphicInsertLiteralRow<TableT extends AnyTable> = ({
    [name in TableParentCollectionUtil.RequiredColumnNames<TableT>]: (TableParentCollectionUtil.ColumnType<TableT, name>);
} & {
    [name in TableParentCollectionUtil.OptionalColumnNames<TableT>]?: (TableParentCollectionUtil.ColumnType<TableT, name>);
});
export declare type PolymorphicInsertLiteralSubRow<TableT extends AnyTable, ExtractT extends Extract<keyof TableT["columns"], string>> = ({
    [name in Extract<TableParentCollectionUtil.RequiredColumnNames<TableT>, ExtractT>]: (TableParentCollectionUtil.ColumnType<TableT, name>);
} & {
    [name in Extract<TableParentCollectionUtil.OptionalColumnNames<TableT>, ExtractT>]?: (TableParentCollectionUtil.ColumnType<TableT, name>);
});
export declare type PolymorphicInsertLiteralRowExclude<TableT extends AnyTable, ExcludeT extends Extract<keyof TableT["columns"], string>> = ({
    [name in Exclude<TableParentCollectionUtil.RequiredColumnNames<TableT>, ExcludeT>]: (TableParentCollectionUtil.ColumnType<TableT, name>);
} & {
    [name in Exclude<TableParentCollectionUtil.OptionalColumnNames<TableT>, ExcludeT>]?: (TableParentCollectionUtil.ColumnType<TableT, name>);
});
export declare function polymorphicInsertValueAndFetch<TableT extends AnyTable>(db: PooledDatabase, table: TableT, row: PolymorphicRawInsertValueRow<TableT>): Promise<TableParentCollectionUtil.TableRow<TableT>>;
//# sourceMappingURL=polymorphic-insert-value-and-fetch.d.ts.map