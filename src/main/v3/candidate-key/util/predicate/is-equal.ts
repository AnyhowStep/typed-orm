import {CandidateKey} from "../../candidate-key";
import {isSubKey} from "./is-sub-key";

export function isEqual (a : CandidateKey, b : CandidateKey) : boolean {
    return (
        isSubKey(a, b) &&
        isSubKey(b, a)
    );
}