import { ITable } from "../../table";
import { ColumnMapUtil } from "../../../column-map";
export declare type ColumnNames<TableT extends ITable> = (ColumnMapUtil.ColumnNames<TableT["columns"]>);
export declare function columnNames<TableT extends ITable>(table: TableT): ColumnNames<TableT>[];
//# sourceMappingURL=column-names.d.ts.map