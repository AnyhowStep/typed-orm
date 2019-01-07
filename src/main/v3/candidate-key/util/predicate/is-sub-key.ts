import {CandidateKey} from "../../candidate-key";

export type IsSubKey<
    A extends CandidateKey,
    B extends CandidateKey
> = (
    A extends CandidateKey ?
    (
        B extends CandidateKey ?
        (
            A[number] extends B[number] ?
            true :
            false
        ) :
        never
    ) :
    never
);
export function isSubKey<
    A extends CandidateKey,
    B extends CandidateKey
> (
    a : A,
    b : B
) : IsSubKey<A, B> {
    return a.every(
        aKey => b.indexOf(aKey) >= 0
    ) as IsSubKey<A, B>;
}