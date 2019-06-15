import {IColumn} from "../column";

export interface ColumnMap {
    readonly [columnName : string] : IColumn
};
export interface WritableColumnMap {
    [columnName : string] : IColumn
}