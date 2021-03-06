import {IColumn} from "../../column";

export type ExcludeNullable<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    (
        null extends ReturnType<ColumnT["assertDelegate"]> ?
        never :
        ColumnT
    ) :
    never
);