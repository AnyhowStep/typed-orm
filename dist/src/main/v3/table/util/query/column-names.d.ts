import { ITable } from "../../table";
import { ColumnUtil } from "../../../column";
export declare type ColumnNames<TableT extends ITable> = (ColumnUtil.Name.FromColumnMap<TableT["columns"]>);
export declare function columnNames<TableT extends ITable>(table: TableT): ColumnNames<TableT>[];
//# sourceMappingURL=column-names.d.ts.map