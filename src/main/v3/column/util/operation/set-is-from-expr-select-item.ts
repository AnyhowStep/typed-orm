import {IColumn, Column} from "../../column";

export function setIsFromExprSelectItem<ColumnT extends IColumn> (
    column : ColumnT,
    __isFromExprSelectItem : boolean,
) : Column<ColumnT> {
    return new Column(
        column,
        __isFromExprSelectItem
    );
}
