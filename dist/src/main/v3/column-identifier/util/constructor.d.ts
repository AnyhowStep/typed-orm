import { IColumn } from "../../column";
import { ColumnMap } from "../../column-map";
import { SelectItem } from "../../select-item";
import { IExprSelectItem } from "../../expr-select-item";
export declare type FromColumn<ColumnT extends IColumn> = (ColumnT extends IColumn ? {
    readonly tableAlias: ColumnT["tableAlias"];
    readonly name: ColumnT["name"];
} : never);
export declare function fromColumn<ColumnT extends IColumn>(column: ColumnT): FromColumn<ColumnT>;
export declare type FromExprSelectItem<ExprSelectItemT extends IExprSelectItem> = (ExprSelectItemT extends IExprSelectItem ? {
    readonly tableAlias: ExprSelectItemT["tableAlias"];
    readonly name: ExprSelectItemT["alias"];
} : never);
export declare function fromExprSelectItem<ExprSelectItemT extends IExprSelectItem>(exprSelectItem: ExprSelectItemT): FromExprSelectItem<ExprSelectItemT>;
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? FromColumn<ColumnMapT[Extract<keyof ColumnMapT, string>]> : never);
export declare type FromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends SelectItem ? (FromColumn<Extract<SelectItemT, IColumn>> | FromExprSelectItem<Extract<SelectItemT, IExprSelectItem>> | FromColumnMap<Extract<SelectItemT, ColumnMap>>) : never);
export declare type FromSelectItemArrayIgnoreIndex<SelectsT extends SelectItem[], IgnoreIndexT extends Extract<keyof SelectsT, string>> = ({
    [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]: (SelectsT[index] extends SelectItem ? FromSelectItem<SelectsT[index]> : never);
}[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]);
//# sourceMappingURL=constructor.d.ts.map