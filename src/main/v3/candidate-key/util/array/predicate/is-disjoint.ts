import {CandidateKey} from "../../../candidate-key";
import {isEqual} from "../../predicate";

export function isDisjoint (
    arrayA : CandidateKey[],
    arrayB : CandidateKey[]
) : boolean {
    for (let a of arrayA) {
        for (let b of arrayB) {
            if (isEqual(a, b)) {
                return false;
            }
        }
    }
    return true;
}
