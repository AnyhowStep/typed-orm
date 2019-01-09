import { ColumnUtil } from "../../../column";
import { SingleValueSelectItem } from "../../../select-item";
import { FromColumn } from "./from-column";
export declare type FromSingleValueSelectItem<SelectItemT extends SingleValueSelectItem> = (FromColumn<ColumnUtil.FromSingleValueSelectItem<SelectItemT>>);
export declare function fromSingleValueSelectItem<SelectItemT extends SingleValueSelectItem>(selectItem: SelectItemT): (FromSingleValueSelectItem<SelectItemT>);
//# sourceMappingURL=from-single-value-select-item.d.ts.map