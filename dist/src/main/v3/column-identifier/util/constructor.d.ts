import { IColumn } from "../../column";
import { ColumnMap } from "../../column-map";
import { SelectItem } from "../../select-item";
import { IExprSelectItem } from "../../expr-select-item";
import { ColumnRef } from "../../column-ref";
import { IJoin } from "../../join";
import { IQuery } from "../../query";
import { ColumnIdentifierMap } from "../../column-identifier-map";
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
export declare type FromColumnIdentifierMap<ColumnMapT extends ColumnIdentifierMap> = (ColumnMapT extends ColumnIdentifierMap ? ColumnMapT[Extract<keyof ColumnMapT, string>] : never);
export declare type FromSelectItem<SelectItemT extends SelectItem> = (SelectItemT extends SelectItem ? (FromColumn<Extract<SelectItemT, IColumn>> | FromExprSelectItem<Extract<SelectItemT, IExprSelectItem>> | FromColumnMap<Extract<SelectItemT, ColumnMap>>) : never);
export declare type FromSelectItemArrayIgnoreIndex<SelectsT extends SelectItem[], IgnoreIndexT extends Extract<keyof SelectsT, string>> = ({
    [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]: (SelectsT[index] extends SelectItem ? FromSelectItem<SelectsT[index]> : never);
}[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]);
export declare type FromColumnRef<ColumnRefT extends ColumnRef> = (ColumnRefT extends ColumnRef ? FromColumnMap<ColumnRefT[Extract<keyof ColumnRefT, string>]> : never);
export declare type FromJoin<JoinT extends IJoin> = (FromColumnMap<JoinT["columns"]>);
export declare type FromQuery<QueryT extends IQuery> = ((QueryT["_joins"] extends IJoin[] ? FromJoin<QueryT["_joins"][number]> : never) | (QueryT["_parentJoins"] extends IJoin[] ? FromJoin<QueryT["_parentJoins"][number]> : never) | (QueryT["_selects"] extends SelectItem[] ? FromSelectItem<QueryT["_selects"][number]> : never));
//# sourceMappingURL=constructor.d.ts.map