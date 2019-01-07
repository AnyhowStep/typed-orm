import { ITable } from "../../../table";
import { ColumnUtil } from "../../../column";
import { IsNullable, HasExplicitDefaultValue, IsMutable } from "../predicate";
export declare type ParentColumnNames<TableT extends ITable> = (ColumnUtil.Name.FromColumnMap<TableT["parents"][number]["columns"]>);
export declare type ColumnNames<TableT extends ITable> = (ColumnUtil.Name.FromColumnMap<TableT["columns"] | TableT["parents"][number]["columns"]>);
export declare function uniqueColumnNames<TableT extends ITable>(table: TableT): Set<ColumnNames<TableT>>;
export declare type GeneratedColumnNames<TableT extends ITable> = ((TableT | TableT["parents"][number])["generated"][number]);
export declare function uniqueGeneratedColumnNames<TableT extends ITable>(table: TableT): Set<GeneratedColumnNames<TableT>>;
export declare type NonGeneratedColumnNames<TableT extends ITable> = (Exclude<ColumnNames<TableT>, GeneratedColumnNames<TableT>>);
export declare function uniqueNonGeneratedColumnNames<TableT extends ITable>(table: TableT): Set<NonGeneratedColumnNames<TableT>>;
export declare type OptionalColumnNames<TableT extends ITable> = ({
    [columnName in NonGeneratedColumnNames<TableT>]: (true extends (IsNullable<TableT, columnName> | HasExplicitDefaultValue<TableT, columnName>) ? columnName : never);
}[NonGeneratedColumnNames<TableT>]);
export declare function uniqueOptionalColumnNames<TableT extends ITable>(table: TableT): Set<OptionalColumnNames<TableT>>;
export declare type RequiredColumnNames<TableT extends ITable> = ({
    [columnName in NonGeneratedColumnNames<TableT>]: (true extends (IsNullable<TableT, columnName> | HasExplicitDefaultValue<TableT, columnName>) ? never : columnName);
}[NonGeneratedColumnNames<TableT>]);
export declare function uniqueRequiredColumnNames<TableT extends ITable>(table: TableT): Set<RequiredColumnNames<TableT>>;
export declare type MutableColumnNames<TableT extends ITable> = ({
    [columnName in ColumnNames<TableT>]: (IsMutable<TableT, columnName> extends true ? columnName : never);
}[ColumnNames<TableT>]);
export declare function uniqueMutableColumnNames<TableT extends ITable>(table: TableT): Set<MutableColumnNames<TableT>>;
//# sourceMappingURL=column-names.d.ts.map