import {Key} from "../../../key";
import {ExtractSubKey} from "../../query";
import {isSubKey} from "../../predicate";

export type FindSubKey<
    ArrT extends Key[],
    KeyT extends Key
> = (
    ExtractSubKey<
        ArrT[number],
        KeyT
    >
);
export function findSubKeys<
    ArrT extends Key[],
    KeyT extends Key
>(arr : ArrT, key : KeyT) : FindSubKey<ArrT, KeyT>[] {
    const result : Key[] = [];
    for (let k of arr) {
        if (isSubKey(k, key)) {
            result.push(k);
        }
    }
    return result as FindSubKey<ArrT, KeyT>[];
}