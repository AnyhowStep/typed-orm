import {IColumn} from "../../column";
import {ColumnMap} from "../../column-map";
import {SelectItem} from "../../select-item";
import {IExprSelectItem} from "../../expr-select-item";

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
export type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (
    ExprSelectItemT extends IExprSelectItem ?
    {
        readonly tableAlias : ExprSelectItemT["tableAlias"],
        readonly name : ExprSelectItemT["alias"],
    } :
    never
);
export function fromExprSelectItem<ExprSelectItemT extends IExprSelectItem> (
    exprSelectItem : ExprSelectItemT
) : FromExprSelectItem<ExprSelectItemT> {
    const result : {
        readonly tableAlias : ExprSelectItemT["tableAlias"],
        readonly name : ExprSelectItemT["alias"],
    } = {
        tableAlias : exprSelectItem.tableAlias,
        name : exprSelectItem.alias,
    };
    return result as FromExprSelectItem<ExprSelectItemT>;
}
export type FromColumnMap<ColumnMapT extends ColumnMap> = (
    ColumnMapT extends ColumnMap ?
    FromColumn<ColumnMapT[Extract<keyof ColumnMapT, string>]> :
    never
);
export type FromSelectItem<SelectItemT extends SelectItem> = (
    SelectItemT extends SelectItem ?
    (
        FromColumn<Extract<SelectItemT, IColumn>> |
        FromExprSelectItem<Extract<SelectItemT, IExprSelectItem>> |
        FromColumnMap<Extract<SelectItemT, ColumnMap>>
    ) :
    never
);
export type FromSelectItemArrayIgnoreIndex<
    SelectsT extends SelectItem[],
    IgnoreIndexT extends Extract<keyof SelectsT, string>
> = (
    {
        [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>] : (
            SelectsT[index] extends SelectItem ?
            FromSelectItem<SelectsT[index]> :
            never
        )
    }[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]
);