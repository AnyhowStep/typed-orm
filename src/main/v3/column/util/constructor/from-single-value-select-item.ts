import {IColumn, Column} from "../../column";
import {isColumn} from "../predicate";
import {SingleValueSelectItem} from "../../../select-item";
import {IExprSelectItem, ExprSelectItemUtil} from "../../../expr-select-item";
import {FromExprSelectItem, fromExprSelectItem} from "./from-expr-select-item";

export type FromSingleValueSelectItem<ItemT extends SingleValueSelectItem> = (
    ItemT extends IColumn ?
    Column<{
        readonly tableAlias : ItemT["tableAlias"];
        readonly name : ItemT["name"];
        readonly assertDelegate : ItemT["assertDelegate"];
    }> :
    ItemT extends IExprSelectItem ?
    FromExprSelectItem<ItemT> :
    never
);
export function fromSingleValueSelectItem<ItemT extends SingleValueSelectItem> (
    item : ItemT
) : FromSingleValueSelectItem<ItemT> {
    if (isColumn(item)) {
        return new Column(item) as any;
    } else if (ExprSelectItemUtil.isExprSelectItem(item)) {
        return fromExprSelectItem(item) as any;
    } else {
        throw new Error(`Unknown SingleValueSelectItem`);
    }
}