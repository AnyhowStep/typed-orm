import {CandidateKey} from "../../../candidate-key";
import {isEqual} from "../../predicate";

export type HasKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
>= (
    KeyT extends ArrT[number]?
    (
        Extract<ArrT[number], KeyT> extends never?
        false :
        true
    ) :
    false
);
export function hasKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> (
    arr : ArrT,
    key : KeyT
) : HasKey<ArrT, KeyT> {
    for (let k of arr) {
        if (isEqual(k, key)) {
            return true as HasKey<ArrT, KeyT>;
        }
    }
    return false as HasKey<ArrT, KeyT>;
}
