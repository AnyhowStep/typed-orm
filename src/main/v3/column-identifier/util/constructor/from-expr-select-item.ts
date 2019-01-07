import {IExprSelectItem} from "../../../expr-select-item";

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