import {AnyColumn} from "./column";

export type ColumnReferences = {
    [table : string] : {
        [column : string] : AnyColumn
    }
};
export type PartialColumnReferences = {
    [table : string] : {
        [column : string] : AnyColumn|undefined
    }|undefined
};
