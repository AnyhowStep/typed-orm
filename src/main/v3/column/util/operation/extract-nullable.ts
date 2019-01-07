import {IColumn} from "../../column";

export type ExtractNullable<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    (
        null extends ReturnType<ColumnT["assertDelegate"]> ?
        ColumnT :
        never
    ) :
    never
);