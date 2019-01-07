import {IColumn, Column} from "../../column";

export function setIsInSelectClause<ColumnT extends IColumn> (
    column : ColumnT,
    __isInSelectClause : boolean,
) : Column<ColumnT> {
    return new Column(
        column,
        __isInSelectClause
    );
}
