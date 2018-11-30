import {ITable, Table} from "./table";

export function tableFromTable<TableT extends ITable> (
    table : TableT
) : Table<TableT> {
    return new Table(table, table.__databaseName);
}