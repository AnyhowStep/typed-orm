import { IColumn, Column } from "../../column";
import { SingleValueSelectItem } from "../../../select-item";
import { IExprSelectItem } from "../../../expr-select-item";
import { FromExprSelectItem } from "./from-expr-select-item";
export declare type FromSingleValueSelectItem<ItemT extends SingleValueSelectItem> = (ItemT extends IColumn ? Column<{
    readonly tableAlias: ItemT["tableAlias"];
    readonly name: ItemT["name"];
    readonly assertDelegate: ItemT["assertDelegate"];
}> : ItemT extends IExprSelectItem ? FromExprSelectItem<ItemT> : never);
export declare function fromSingleValueSelectItem<ItemT extends SingleValueSelectItem>(item: ItemT): FromSingleValueSelectItem<ItemT>;
