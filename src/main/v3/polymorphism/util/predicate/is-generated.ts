import {ITable} from "../../../table";
import {GeneratedColumnNames} from "../query";

//At least one table has to generate it.
export type IsGenerated<TableT extends ITable, NameT extends string> = (
    NameT extends GeneratedColumnNames<TableT> ?
    true :
    false
);
