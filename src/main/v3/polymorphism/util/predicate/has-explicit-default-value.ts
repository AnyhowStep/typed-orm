import {ITable, TableUtil} from "../../../table";

//All parents must have it as explicit default value.
//The actual table itself doesn't really matter.
//It'll just use the parents' value.
export type HasExplicitDefaultValue<TableT extends ITable, NameT extends string> = (
    TableUtil.HasExplicitDefaultValue<TableT["parents"][number], NameT> extends true ?
    true :
    false
);