import {CandidateKey} from "../../candidate-key";

export type ExtractSubKey<
    A extends CandidateKey,
    B extends CandidateKey
> = (
    A extends CandidateKey ?
    (
        B extends CandidateKey ?
        (
            A[number] extends B[number] ?
            A :
            never
        ) :
        never
    ) :
    never
);