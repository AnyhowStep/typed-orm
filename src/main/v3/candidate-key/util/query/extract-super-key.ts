import {CandidateKey} from "../../candidate-key";

export type ExtractSuperKey<
    A extends CandidateKey,
    B extends CandidateKey
> = (
    A extends CandidateKey ?
    (
        B extends CandidateKey ?
        (
            B[number] extends A[number] ?
            A :
            never
        ) :
        never
    ) :
    never
);