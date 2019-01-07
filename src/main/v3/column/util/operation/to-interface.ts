import {IColumn} from "../../column";

//https://github.com/Microsoft/TypeScript/issues/28876
export type ToInterface<ColumnT extends IColumn> = (
    ColumnT extends IColumn ?
    IColumn<{
        readonly tableAlias : ColumnT["tableAlias"],
        readonly name : ColumnT["name"],
        readonly assertDelegate : ColumnT["assertDelegate"],
    }> :
    never
);
