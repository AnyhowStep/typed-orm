import {ITable} from "../../../table";
import {IColumn} from "../../../column";

export function tryGetGeneratedNonAutoIncrementColumn (
    table : ITable,
    columnName : string
) : IColumn|undefined {
    if (
        table.generated.indexOf(columnName) >= 0 &&
        table.autoIncrement != columnName
    ) {
        return table.columns[columnName];
    }
    for (let parent of table.parents) {
        if (
            parent.generated.indexOf(columnName) >= 0 &&
            parent.autoIncrement != columnName
        ) {
            return parent.columns[columnName];
        }
    }
    return undefined;
}