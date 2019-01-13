import {Key} from "../../../key";
import {IsSubKey, isSubKey} from "../../predicate";

export type HasSuperKey<
    ArrT extends Key[],
    KeyT extends Key
> = (
    true extends IsSubKey<KeyT, ArrT[number]> ?
    true :
    false
);
export function hasSuperKey<
    ArrT extends Key[],
    KeyT extends Key
> (
    arr : ArrT,
    key : KeyT
) : HasSuperKey<ArrT, KeyT> {
    for (let k of arr) {
        if (isSubKey(key, k)) {
            return true as HasSuperKey<ArrT, KeyT>;
        }
    }
    return false as HasSuperKey<ArrT, KeyT>;
}
