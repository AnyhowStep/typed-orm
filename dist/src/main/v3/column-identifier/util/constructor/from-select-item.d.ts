import { IColumn } from "../../../column";
import { ColumnMap } from "../../../column-map";
import { SelectItem } from "../../../select-item";
import { IExprSelectItem } from "../../../expr-select-item";
import { ColumnRef } from "../../../column-ref";
import { FromColumn } from "./from-column";
import { FromExprSelectItem } from "./from-expr-select-item";
import { FromColumnMap } from "./from-column-map";
import { FromColumnRef } from "./from-column-ref";
export declare type FromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends SelectItem ? (FromColumn<Extract<SelectItemT, IColumn>> | FromExprSelectItem<Extract<SelectItemT, IExprSelectItem>> | FromColumnMap<Extract<SelectItemT, ColumnMap>> | FromColumnRef<Extract<SelectItemT, ColumnRef>>) : never);
//# sourceMappingURL=from-select-item.d.ts.map