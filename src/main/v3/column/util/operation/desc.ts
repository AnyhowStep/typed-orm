import {IColumn} from "../../column";
import {DESC} from "../../../order";

export type Desc<ColumnT extends IColumn> = (
    [ColumnT, typeof DESC]
);
export function desc<
    ColumnT extends IColumn
> (column : ColumnT) : Desc<ColumnT> {
    return [column, DESC];
}