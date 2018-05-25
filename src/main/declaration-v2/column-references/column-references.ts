import {AnyColumn} from "../column";

export type ColumnReferences = {
    readonly [tableAlias : string] : {
        readonly [columnName : string] : AnyColumn
    }
};
export type PartialColumnReferences = {
    readonly [tableAlias in string]? : {
        readonly [columnName in string]? : (AnyColumn|undefined)
    }|undefined
};
