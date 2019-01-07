import {CandidateKey} from "../../../candidate-key";
import {ExtractSuperKey} from "../../query";
import {isSubKey} from "../../predicate";

export type FindSuperKey<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
> = (
    ExtractSuperKey<
        ArrT[number],
        KeyT
    >
);
export function findSuperKeys<
    ArrT extends CandidateKey[],
    KeyT extends CandidateKey
>(arr : ArrT, key : KeyT) : FindSuperKey<ArrT, KeyT>[] {
    const result : CandidateKey[] = [];
    for (let k of arr) {
        if (isSubKey(key, k)) {
            result.push(k);
        }
    }
    return result as FindSuperKey<ArrT, KeyT>[];
}