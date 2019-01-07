import {CandidateKey} from "../../../candidate-key";
import {IsSubKey, isSubKey} from "../../predicate";

export type HasSuperKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    true extends IsSubKey<KeyT, ArrT[number]> ?
    true :
    false
);
export function hasSuperKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
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
