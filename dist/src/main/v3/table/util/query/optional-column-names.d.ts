import { ITable } from "../../table";
export declare type OptionalColumnNames<TableT extends ITable> = (Exclude<(TableT["isNullable"][number] | TableT["hasExplicitDefaultValue"][number]), (TableT["generated"][number])>);
export declare function isOptional(table: ITable, columnName: string): boolean;
export declare function optionalColumnNames<TableT extends ITable>(table: TableT): OptionalColumnNames<TableT>[];
//# sourceMappingURL=optional-column-names.d.ts.map