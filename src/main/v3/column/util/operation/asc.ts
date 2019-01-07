import {IColumn} from "../../column";
import {ASC} from "../../../order";

export type Asc<ColumnT extends IColumn> = (
    [ColumnT, typeof ASC]
);
export function asc<
    ColumnT extends IColumn
> (column : ColumnT) : Asc<ColumnT> {
    return [column, ASC];
}
