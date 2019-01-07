import {IColumn} from "../../../column";

export type FromColumn<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    {
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
    } :
    never
);
export function fromColumn<ColumnT extends IColumn> (
    column : ColumnT
) : FromColumn<ColumnT> {
    const result : {
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
    } = {
        tableAlias : column.tableAlias,
        name : column.name,
    };
    return result as FromColumn<ColumnT>;
}