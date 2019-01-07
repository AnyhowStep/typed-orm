import {ITable} from "../../../table";
import {IColumn} from "../../../column";

export function getColumnsWithName (
    table : ITable,
    columnName : string
) : IColumn[] {
    const result : IColumn[] = [];
    if (columnName in table.columns) {
        result.push(table.columns[columnName]);
    }
    for (let p of table.parents) {
        if (columnName in p.columns) {
            result.push(p.columns[columnName]);
        }
    }
    return result;
}