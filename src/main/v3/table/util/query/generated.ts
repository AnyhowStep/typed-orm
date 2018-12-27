import {ITable} from "../../table";

export function isGenerated (table : ITable, columnName : string) : boolean {
    return (table.generated.indexOf(columnName) >= 0);
}