import { ITable } from "../../table";
export declare type OptionalColumnNames<TableT extends ITable> = (Exclude<(TableT["isNullable"][number] | TableT["hasExplicitDefaultValue"][number]), (TableT["generated"][number])>);
export declare function isOptional(table: ITable, columnName: string): boolean;
//# sourceMappingURL=optional-column-names.d.ts.map