import { ColumnIdentifierRef } from "../../column-identifier-ref";
import { IColumn } from "../../../column";
import { IExprSelectItem } from "../../../expr-select-item";
import { ColumnMap } from "../../../column-map";
import { SelectItem } from "../../../select-item";
import { ColumnRef } from "../../../column-ref";
import { Writable } from "../../../type";
import { FromColumn } from "./from-column";
import { FromExprSelectItem } from "./from-expr-select-item";
import { FromColumnMap } from "./from-column-map";
import { FromColumnRef } from "./from-column-ref";
export declare type FromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends IColumn ? FromColumn<SelectItemT> : SelectItemT extends IExprSelectItem ? FromExprSelectItem<SelectItemT> : SelectItemT extends ColumnMap ? FromColumnMap<SelectItemT> : SelectItemT extends ColumnRef ? FromColumnRef<SelectItemT> : never);
export declare function appendSelectItem(ref: Writable<ColumnIdentifierRef>, item: SelectItem): Writable<ColumnIdentifierRef>;
//# sourceMappingURL=from-select-item.d.ts.map