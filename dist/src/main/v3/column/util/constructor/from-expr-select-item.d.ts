import { Column } from "../../column";
import { IExprSelectItem } from "../../../expr-select-item";
export declare type FromExprSelectItem<ItemT extends IExprSelectItem> = (Column<{
    readonly tableAlias: ItemT["tableAlias"];
    readonly name: ItemT["alias"];
    readonly assertDelegate: ItemT["assertDelegate"];
}>);
export declare function fromExprSelectItem<ItemT extends IExprSelectItem>(item: ItemT): FromExprSelectItem<ItemT>;
