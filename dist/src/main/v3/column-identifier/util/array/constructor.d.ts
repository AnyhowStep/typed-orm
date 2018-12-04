import * as Ctor from "../constructor";
import { ColumnMap } from "../../../column-map";
import { SelectItem } from "../../../select-item";
export declare type FromColumnMap<ColumnMapT extends ColumnMap> = (Ctor.FromColumnMap<ColumnMapT>[]);
export declare function fromColumnMap<ColumnMapT extends ColumnMap>(columnMap: ColumnMapT): FromColumnMap<ColumnMapT>;
export declare type FromSelectItem<SelectItemT extends SelectItem> = (Ctor.FromSelectItem<SelectItemT>[]);
export declare function fromSelectItem<SelectItemT extends SelectItem>(selectItem: SelectItemT): FromSelectItem<SelectItemT>;
export declare type FromSelectItemArrayIgnoreIndex<SelectsT extends SelectItem[], IgnoreIndexT extends Extract<keyof SelectsT, string>> = ({
    [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]: (SelectsT[index] extends SelectItem ? FromSelectItem<SelectsT[index]> : never);
}[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]);
//# sourceMappingURL=constructor.d.ts.map