import {Writable} from "../../../type";
import {ColumnMap} from "../../column-map";
import {IColumn} from "../../../column";

export type FromColumnArray<ColumnsT extends IColumn[]> = (
    {
        readonly [columnName in ColumnsT[number]["name"]] : (
            Extract<ColumnsT[number], { name : columnName }>
        )
    }
);
export function fromColumnArray<ColumnsT extends IColumn[]> (
    columns : ColumnsT
) : FromColumnArray<ColumnsT> {
    const result : Writable<ColumnMap> = {};
    for (let column of columns) {
        result[column.name] = column;
    }
    return result as FromColumnArray<ColumnsT>;
}