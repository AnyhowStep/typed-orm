import {ColumnMap} from "../../column-map";
import {IColumn} from "../../../column";

export function getSortedColumnArray (columnMap : ColumnMap) : IColumn[] {
    const columnNames = Object.keys(columnMap);
    columnNames.sort();
    const result : IColumn[] = [];
    for (let columnName of columnNames) {
        result.push(columnMap[columnName]);
    }
    return result;
}