import {CandidateKey} from "../../candidate-key";

export type FromCandidateKeyArray<ArrT extends CandidateKey[]> = (
    ArrT[number]
);