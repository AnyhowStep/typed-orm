import {Key} from "../../../key";
import {IsSubKey, isSubKey} from "../../predicate";

export type HasSubKey<
    ArrT extends Key[],
    KeyT extends Key
> = (
    true extends IsSubKey<ArrT[number], KeyT> ?
    true :
    false
);
export function hasSubKey<
    ArrT extends Key[],
    KeyT extends Key
> (
    arr : ArrT,
    key : KeyT
) : HasSubKey<ArrT, KeyT> {
    for (let k of arr) {
        if (isSubKey(k, key)) {
            return true as HasSubKey<ArrT, KeyT>;
        }
    }
    return false as HasSubKey<ArrT, KeyT>;
}