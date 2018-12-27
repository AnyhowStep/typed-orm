import { RawExprNoUsedRef } from "../../../raw-expr";
import { ITable, TableUtil } from "../../../table";
import { RequiredColumnNames, OptionalColumnNames, ColumnType, TypeMap } from "../query";
import { IConnection } from "../../../execution";
export declare type InsertRow<TableT extends ITable> = ({
    [name in RequiredColumnNames<TableT>]: (RawExprNoUsedRef<ColumnType<TableT, name>>);
} & {
    [name in OptionalColumnNames<TableT>]?: (RawExprNoUsedRef<ColumnType<TableT, name>>);
});
export declare type InsertRowLiteral<TableT extends ITable> = ({
    [name in RequiredColumnNames<TableT>]: (ColumnType<TableT, name>);
} & {
    [name in OptionalColumnNames<TableT>]?: (ColumnType<TableT, name>);
});
export declare function insertAndFetch<TableT extends ITable & {
    insertAllowed: true;
}>(connection: IConnection & TableUtil.AssertHasCandidateKey<TableT>, table: TableT, rawInsertRow: InsertRow<TableT>): Promise<TypeMap<TableT>>;
//# sourceMappingURL=insert-and-fetch.d.ts.map