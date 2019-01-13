import {ITable} from "../table";

/*
    Represents a row of the table, when retrieved from MySQL.
*/
export type Row<TableT extends ITable> = (
    {
        readonly [columnName in Extract<keyof TableT["columns"], string>] : (
            ReturnType<TableT["columns"][columnName]["assertDelegate"]>
        )
    }
);