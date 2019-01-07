import {IColumn} from "../../column";
import {SortDirection} from "../../../order";

export type Sort<ColumnT extends IColumn> = (
    [ColumnT, SortDirection]
);
export function sort<
    ColumnT extends IColumn
> (column : ColumnT, sortDirection : SortDirection) : Sort<ColumnT> {
    return [column, sortDirection];
}