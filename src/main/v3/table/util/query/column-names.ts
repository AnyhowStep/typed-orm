import {ITable} from "../../table";
import {ColumnMapUtil} from "../../../column-map";

export type ColumnNames<TableT extends ITable> = (
    ColumnMapUtil.ColumnNames<TableT["columns"]>
);
export function columnNames<TableT extends ITable> (
    table : TableT
) : ColumnNames<TableT>[] {
    return ColumnMapUtil.columnNames<
        TableT["columns"]
    >(table.columns);
}