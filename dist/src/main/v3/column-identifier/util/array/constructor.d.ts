import * as Ctor from "../constructor";
import { ColumnMap } from "../../../column-map";
import { SelectItem } from "../../../select-item";
import { ColumnRef } from "../../../column-ref";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (ColumnMapT extends ColumnMap ? Ctor.FromColumnMap<ColumnMapT>[] : never);
export declare function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
export declare type FromSelectItem<SelectItemT extends SelectItem> = (Ctor.FromSelectItem<SelectItemT>[]);
export declare function fromSelectItem<SelectItemT extends SelectItem>(selectItem: SelectItemT): FromSelectItem<SelectItemT>;
export declare type FromSelectItemArray<ArrT extends SelectItem[]> = (FromSelectItem<ArrT[number]>);
export declare function fromSelectItemArray<ArrT extends SelectItem[]>(arr: ArrT): FromSelectItemArray<ArrT>;
export declare type FromSelectItemArrayIgnoreIndex<SelectsT extends SelectItem[], IgnoreIndexT extends Extract<keyof SelectsT, string>> = ({
    [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]: (SelectsT[index] extends SelectItem ? FromSelectItem<SelectsT[index]> : never);
}[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]);
export declare type FromColumnRef<ColumnRefT extends ColumnRef> = (Ctor.FromColumnRef<ColumnRefT>[]);
export declare function fromColumnRef<ColumnRefT extends ColumnRef>(columnRef: ColumnRefT): FromColumnRef<ColumnRefT>;
//# sourceMappingURL=constructor.d.ts.map