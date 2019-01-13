import {Key} from "../../../key";
import {ExtractSuperKey} from "../../query";
import {isSubKey} from "../../predicate";

export type FindSuperKey<
    ArrT extends Key[],
    KeyT extends Key
> = (
    ExtractSuperKey<
        ArrT[number],
        KeyT
    >
);
export function findSuperKeys<
    ArrT extends Key[],
    KeyT extends Key
>(arr : ArrT, key : KeyT) : FindSuperKey<ArrT, KeyT>[] {
    const result : Key[] = [];
    for (let k of arr) {
        if (isSubKey(key, k)) {
            result.push(k);
        }
    }
    return result as FindSuperKey<ArrT, KeyT>[];
}