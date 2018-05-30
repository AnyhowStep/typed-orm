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
export declare function polymorphicInsertValueAndFetch<TableT extends AnyTable>(db: PooledDatabase, table: TableT, row: PolymorphicRawInsertValueRow<TableT>): Promise<TableParentCollectionUtil.TableRow<TableT>>;
