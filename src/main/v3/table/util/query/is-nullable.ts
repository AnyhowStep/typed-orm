import {ITable} from "../../table";

export type IsNullable<TableT extends ITable, NameT extends string> = (
    TableT extends ITable ?
    (
        NameT extends keyof TableT["columns"] ?
        (
            NameT extends TableT["isNullable"][number] ?
            true :
            false
        ) :
        false
    ) :
    never
);