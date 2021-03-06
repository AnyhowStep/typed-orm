import {SelectItem} from "../../../../select-item";
import {FromSelectItem} from "./from-select-item";

export type FromSelectItemArrayIgnoreIndex<
    SelectsT extends SelectItem[],
    IgnoreIndexT extends Extract<keyof SelectsT, string>
> = (
    {
        [index in Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>] : (
            SelectsT[index] extends SelectItem ?
            FromSelectItem<SelectsT[index]> :
            never
        )
    }[Exclude<Extract<keyof SelectsT, string>, IgnoreIndexT>]
);