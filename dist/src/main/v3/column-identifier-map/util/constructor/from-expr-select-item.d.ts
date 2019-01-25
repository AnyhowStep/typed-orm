import { ColumnIdentifierUtil } from "../../../column-identifier";
import { IExprSelectItem } from "../../../expr-select-item";
export declare type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (ExprSelectItemT extends IExprSelectItem ? {
    readonly [columnName in ExprSelectItemT["alias"]]: (ColumnIdentifierUtil.FromExprSelectItem<ExprSelectItemT>);
} : never);
