import {ITable} from "../../table";

export type IsNullable<TableT extends ITable, NameT extends string> = (
    TableT extends ITable ?
    (
        NameT extends TableT["isNullable"][number] ?
        true :
        false
    ) :
    never
);