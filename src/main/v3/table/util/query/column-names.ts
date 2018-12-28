import {ITable} from "../../table";
import {ColumnUtil} from "../../../column";

export type ColumnNames<TableT extends ITable> = (
    ColumnUtil.Name.FromColumnMap<TableT["columns"]>
);
export function columnNames<TableT extends ITable> (
    table : TableT
) : ColumnNames<TableT>[] {
    return ColumnUtil.Name.Array.fromColumnMap<
        TableT["columns"]
    >(table.columns);
}