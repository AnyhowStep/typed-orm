import { ITable } from "../../table";
import { ColumnUtil } from "../../../column";
export declare type RequiredColumnNames<TableT extends ITable> = (Exclude<ColumnUtil.Name.FromColumnMap<TableT["columns"]>, (TableT["generated"][number] | TableT["isNullable"][number] | TableT["hasExplicitDefaultValue"][number])>);
export declare function isRequired(table: ITable, columnName: string): boolean;
//# sourceMappingURL=required-column-names.d.ts.map