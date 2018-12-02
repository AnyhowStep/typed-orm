import {CandidateKey} from "./candidate-key";

export namespace CandidateKeyUtil {
    export function isEqual (a : CandidateKey, b : CandidateKey) : boolean {
        return (
            a.every(aKey => b.indexOf(aKey) >= 0) &&
            b.every(bKey => a.indexOf(bKey) >= 0)
        );
    }
}