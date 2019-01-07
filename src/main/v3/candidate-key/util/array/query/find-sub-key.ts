import {CandidateKey} from "../../../candidate-key";
import {ExtractSubKey} from "../../query";
import {isSubKey} from "../../predicate";

export type FindSubKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    ExtractSubKey<
        ArrT[number],
        KeyT
    >
);
export function findSubKeys<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
>(arr : ArrT, key : KeyT) : FindSubKey<ArrT, KeyT>[] {
    const result : CandidateKey[] = [];
    for (let k of arr) {
        if (isSubKey(k, key)) {
            result.push(k);
        }
    }
    return result as FindSubKey<ArrT, KeyT>[];
}