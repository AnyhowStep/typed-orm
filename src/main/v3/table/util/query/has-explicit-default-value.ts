import {ITable} from "../../table";

export type HasExplicitDefaultValue<TableT extends ITable, NameT extends string> = (
    TableT extends ITable ?
    (
        NameT extends TableT["hasExplicitDefaultValue"][number] ?
        true :
        false
    ) :
    never
);