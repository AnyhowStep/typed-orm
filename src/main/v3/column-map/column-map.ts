import {IColumn} from "../column";

export interface ColumnMap {
    readonly [columnName : string] : IColumn
};