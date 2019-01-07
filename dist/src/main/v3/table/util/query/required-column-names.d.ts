import { ITable } from "../../table";
import { ColumnMapUtil } from "../../../column-map";
export declare type RequiredColumnNames<TableT extends ITable> = (Exclude<ColumnMapUtil.ColumnNames<TableT["columns"]>, (TableT["generated"][number] | TableT["isNullable"][number] | TableT["hasExplicitDefaultValue"][number])>);
export declare function isRequired<TableT extends ITable>(table: TableT, columnName: string): columnName is RequiredColumnNames<TableT>;
export declare function requiredColumnNames<TableT extends ITable>(table: TableT): RequiredColumnNames<TableT>[];
//# sourceMappingURL=required-column-names.d.ts.map