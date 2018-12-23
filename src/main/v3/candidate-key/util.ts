import {CandidateKey} from "./candidate-key";

export namespace CandidateKeyUtil {
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
    export function isEqual (a : CandidateKey, b : CandidateKey) : boolean {
        return (
            isSubKey(a, b) &&
            isSubKey(b, a)
        );
    }
}