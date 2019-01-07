import {CandidateKey} from "../../../candidate-key";
import {IsSubKey, isSubKey} from "../../predicate";

export type HasSubKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    true extends IsSubKey<ArrT[number], KeyT> ?
    true :
    false
);
export function hasSubKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
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