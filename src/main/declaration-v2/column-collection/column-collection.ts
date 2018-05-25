import {AnyColumn} from "../column";

export type ColumnCollection = {
    readonly [columnName : string] : AnyColumn
};
