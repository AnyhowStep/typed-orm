import {ColumnUtil} from "../../../column";
import {SingleValueSelectItem} from "../../../select-item";
import {FromColumn, fromColumn} from "./from-column";

export type FromSingleValueSelectItem<SelectItemT extends SingleValueSelectItem> = (
    FromColumn<ColumnUtil.FromSingleValueSelectItem<SelectItemT>>
);
export function fromSingleValueSelectItem<
    SelectItemT extends SingleValueSelectItem
> (selectItem : SelectItemT) : (
    FromSingleValueSelectItem<SelectItemT>
) {
    return fromColumn(ColumnUtil.fromSingleValueSelectItem(selectItem));
}