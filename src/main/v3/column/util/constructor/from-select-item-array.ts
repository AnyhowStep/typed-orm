import {SelectItem} from "../../../select-item";
import {FromSelectItem} from "./from-select-item";

export type FromSelectItemArray<ArrT extends SelectItem[]> = (
    FromSelectItem<ArrT[number]>
);