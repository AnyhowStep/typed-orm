import {CandidateKey} from "../../candidate-key";

export function isCandidateKey (raw : any) : raw is CandidateKey {
    if (!(raw instanceof Array)) {
        return false;
    }
    for (let item of raw) {
        if (typeof item != "string") {
            return false;
        }
    }
    return true;
}