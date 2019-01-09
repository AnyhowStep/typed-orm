import { ColumnIdentifierMapUtil } from "../../../column-identifier-map";
import { IExprSelectItem } from "../../../expr-select-item";
import { ColumnIdentifierRef } from "../../column-identifier-ref";
import { Writable } from "../../../type";
export declare type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (ExprSelectItemT extends IExprSelectItem ? {
    readonly [tableAlias in ExprSelectItemT["tableAlias"]]: (ColumnIdentifierMapUtil.FromExprSelectItem<ExprSelectItemT>);
} : never);
export declare function appendExprSelectItem(ref: Writable<ColumnIdentifierRef>, item: IExprSelectItem): Writable<ColumnIdentifierRef>;
//# sourceMappingURL=from-expr-select-item.d.ts.map