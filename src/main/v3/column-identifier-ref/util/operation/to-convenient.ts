import {ColumnIdentifierRef} from "../../column-identifier-ref";
import {HasOneTable} from "../predicate";

export type ToConvenient<ColumnRefT extends ColumnIdentifierRef> = (
    HasOneTable<ColumnRefT> extends true ?
    //Gives us a ColumnIdentifierMap
    ColumnRefT[Extract<keyof ColumnRefT, string>] :
    //Gives us a ColumnIdentifierRef
    ColumnRefT
);
export function toConvenient<ColumnRefT extends ColumnIdentifierRef> (
    columnRef : ColumnRefT
) : ToConvenient<ColumnRefT> {
    const keys = Object.keys(columnRef) as Extract<keyof ColumnRefT, string>[];
    if (keys.length == 1) {
        const result : ColumnRefT[Extract<keyof ColumnRefT, string>] = columnRef[keys[0]];
        return result as any;
    } else {
        return columnRef as any;
    }
}