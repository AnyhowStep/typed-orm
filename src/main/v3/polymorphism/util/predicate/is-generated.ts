import {ITable} from "../../../table";
import {GeneratedColumnNames} from "../query";

//At least one table has to generate it.
export type IsGenerated<TableT extends ITable, NameT extends string> = (
    NameT extends GeneratedColumnNames<TableT> ?
    true :
    false
);
export function isGenerated<TableT extends ITable, NameT extends string> (
    table : TableT,
    name : NameT
) : IsGenerated<TableT, NameT> {
    if (table.generated.indexOf(name) >= 0) {
        return true as IsGenerated<TableT, NameT>;
    }
    for (let p of table.parents) {
        if (p.generated.indexOf(name) >= 0) {
            return true as IsGenerated<TableT, NameT>;
        }
    }
    return false as IsGenerated<TableT, NameT>;
}