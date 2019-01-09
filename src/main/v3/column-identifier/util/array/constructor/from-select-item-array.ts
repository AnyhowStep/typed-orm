import {ColumnIdentifier} from "../../../column-identifier";
import {SelectItem} from "../../../../select-item";
import {FromSelectItem, fromSelectItem} from "./from-select-item";

export type FromSelectItemArray<ArrT extends SelectItem[]> = (
    FromSelectItem<ArrT[number]>
);
export function fromSelectItemArray<ArrT extends SelectItem[]> (
    arr : ArrT
) : FromSelectItemArray<ArrT> {
    const result : ColumnIdentifier[] = [];
    for (let item of arr) {
        result.push(...fromSelectItem(item));
    }
    return result as FromSelectItemArray<ArrT>;
}