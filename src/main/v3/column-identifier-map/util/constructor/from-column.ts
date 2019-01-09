import {ColumnIdentifierUtil} from "../../../column-identifier";
import {IColumn} from "../../../column";

export type FromColumn<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    {
        readonly [columnName in ColumnT["name"]] : (
            ColumnIdentifierUtil.FromColumn<ColumnT>
        )
    } :
    never
);