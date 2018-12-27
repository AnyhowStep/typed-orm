import { ITable } from "../../../table";
import { ColumnUtil } from "../../../column";
import { IsNullable, HasExplicitDefaultValue } from "../predicate";
export declare type ColumnNames<TableT extends ITable> = (ColumnUtil.Name.FromColumnMap<TableT["columns"] | TableT["parents"][number]["columns"]>);
export declare function uniqueColumnNames(table: ITable): string[];
export declare type GeneratedColumnNames<TableT extends ITable> = ((TableT | TableT["parents"][number])["generated"][number]);
export declare function uniqueGeneratedColumnNames(table: ITable): string[];
export declare type NonGeneratedColumnNames<TableT extends ITable> = (Exclude<ColumnNames<TableT>, GeneratedColumnNames<TableT>>);
export declare type OptionalColumnNames<TableT extends ITable> = ({
    [columnName in NonGeneratedColumnNames<TableT>]: (true extends (IsNullable<TableT, columnName> | HasExplicitDefaultValue<TableT, columnName>) ? columnName : never);
}[NonGeneratedColumnNames<TableT>]);
export declare type RequiredColumnNames<TableT extends ITable> = ({
    [columnName in NonGeneratedColumnNames<TableT>]: (true extends (IsNullable<TableT, columnName> | HasExplicitDefaultValue<TableT, columnName>) ? never : columnName);
}[NonGeneratedColumnNames<TableT>]);
//# sourceMappingURL=column-names.d.ts.map