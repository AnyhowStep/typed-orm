import {CandidateKey} from "../../../candidate-key";
import {isCandidateKey} from "../../predicate";

export function isCandidateKeyArray (raw : any) : raw is CandidateKey[] {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (!isCandidateKey(item)) {
            return false;
        }
    }
    return true;
}