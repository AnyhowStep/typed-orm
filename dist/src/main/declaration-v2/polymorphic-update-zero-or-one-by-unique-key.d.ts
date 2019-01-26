import { AnyTable, UniqueKeys } from "./table";
import { AllowedExprConstant, SelectValueBuilder } from "./raw-expr";
import { Expr } from "./expr";
import { ColumnReferencesUtil } from "./column-references";
import { Column } from "./column";
import { PooledDatabase } from "./PooledDatabase";
import { TableParentCollectionUtil } from "./table-parent-collection";
import { UpdateResult } from "./update-builder";
export declare type PolymorphicUpdateResult = (UpdateResult & {
    exists: boolean;
});
export declare type PolymorphicRawUpdateAssignmentType<TableT extends AnyTable, ColumnNameT extends string> = (Extract<TableParentCollectionUtil.ColumnType<TableT, ColumnNameT>, AllowedExprConstant>);
export declare type PolymorphicRawUpdateAssignment<TableT extends AnyTable, ColumnNameT extends string> = (PolymorphicRawUpdateAssignmentType<TableT, ColumnNameT> | Extract<ColumnReferencesUtil.Columns<TableParentCollectionUtil.ToColumnReferences<TableT>>, Column<any, any, PolymorphicRawUpdateAssignmentType<TableT, ColumnNameT>>> | Expr<ColumnReferencesUtil.Partial<TableParentCollectionUtil.ToColumnReferences<TableT>>, PolymorphicRawUpdateAssignmentType<TableT, ColumnNameT>> | SelectValueBuilder<PolymorphicRawUpdateAssignmentType<TableT, ColumnNameT>>);
export declare type PolymorphicRawUpdateAssignmentCollection<TableT extends AnyTable> = ({
    [columnName in TableParentCollectionUtil.MutableColumnNames<TableT>]?: (PolymorphicRawUpdateAssignment<TableT, columnName>);
});
export declare type PolymorphicUpdateAssignmentCollectionDelegate<TableT extends AnyTable> = ((c: ColumnReferencesUtil.ToConvenient<TableParentCollectionUtil.ToColumnReferences<TableT>>) => (PolymorphicRawUpdateAssignmentCollection<TableT>));
export declare function polymorphicUpdateZeroOrOneByUniqueKey<TableT extends AnyTable>(db: PooledDatabase, table: TableT, uniqueKey: UniqueKeys<TableT> & ({} | TableParentCollectionUtil.PartialTableRow<TableT>), setDelegate: PolymorphicUpdateAssignmentCollectionDelegate<TableT>): Promise<PolymorphicUpdateResult>;
//# sourceMappingURL=polymorphic-update-zero-or-one-by-unique-key.d.ts.map