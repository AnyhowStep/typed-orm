import {ITable} from "../../table";

export type HasExplicitDefaultValue<TableT extends ITable, NameT extends string> = (
    TableT extends ITable ?
    (
        NameT extends keyof TableT["columns"] ?
        (
            NameT extends TableT["hasExplicitDefaultValue"][number] ?
            true :
            false
        ) :
        false
    ) :
    never
);