import { IColumn, Column } from "../column";
import { SingleValueSelectItem } from "../../select-item";
import { IExprSelectItem } from "../../expr-select-item";
import { ColumnMap } from "../../column-map";
import { IJoin } from "../../join";
import { ColumnMapUtil } from "../../column-map";
export declare type FromExprSelectItem<ItemT extends IExprSelectItem> = (Column<{
    readonly tableAlias: ItemT["tableAlias"];
    readonly name: ItemT["alias"];
    readonly assertDelegate: ItemT["assertDelegate"];
}>);
export declare function fromExprSelectItem<ItemT extends IExprSelectItem>(item: ItemT): FromExprSelectItem<ItemT>;
export declare type FromSingleValueSelectItem<ItemT extends SingleValueSelectItem> = (ItemT extends IColumn ? Column<{
    readonly tableAlias: ItemT["tableAlias"];
    readonly name: ItemT["name"];
    readonly assertDelegate: ItemT["assertDelegate"];
}> : ItemT extends IExprSelectItem ? FromExprSelectItem<ItemT> : never);
export declare function fromSingleValueSelectItem<ItemT extends SingleValueSelectItem>(item: ItemT): FromSingleValueSelectItem<ItemT>;
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? ColumnMapT[Extract<keyof ColumnMapT, string>] : never);
export declare type FromJoin<JoinT extends IJoin> = (JoinT extends IJoin ? FromColumnMap<ColumnMapUtil.FromJoin<JoinT>> : never);
export declare type FromJoinArray<JoinsT extends IJoin[]> = (FromJoin<JoinsT[number]>);
//# sourceMappingURL=constructor.d.ts.map