import {SelectItem} from "../../../select-item";
import {IColumn} from "../../column";
import {IExprSelectItem} from "../../../expr-select-item";
import {FromExprSelectItem} from "./from-expr-select-item";
import {ColumnMap} from "../../../column-map";
import {FromColumnMap} from "./from-column-map";
import {ColumnRef} from "../../../column-ref";
import {FromColumnRef} from "./from-column-ref";

export type FromSelectItem<ItemT extends SelectItem> = (
    (ItemT extends IColumn ? ItemT : never) |
    (ItemT extends IExprSelectItem ? FromExprSelectItem<ItemT> : never) |
    (ItemT extends ColumnMap ? FromColumnMap<ItemT> : never) |
    (ItemT extends ColumnRef ? FromColumnRef<ItemT> : never)
);