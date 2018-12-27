import {ITable, TableUtil} from "../../../table";

//All tables must have it as nullable.
export type IsNullable<TableT extends ITable, NameT extends string> = (
    TableUtil.IsNullable<TableT|TableT["parents"][number], NameT> extends true ?
    true :
    false
);