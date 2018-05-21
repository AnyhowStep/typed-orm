import {AnyColumn} from "../column";

export type ColumnReferences = {
    readonly [tableAlias : string] : {
        readonly [columnName : string] : AnyColumn
    }
};
export type PartialColumnReferences = {
    readonly [tableAlias : string] : {
        readonly [columnName : string] : AnyColumn|undefined
    }|undefined
};
