import {CandidateKey} from "../../../candidate-key";
import {ExtractEqual} from "../../../../type";
import {isEqual} from "../../predicate";
import {FromCandidateKeyArray} from "../../constructor";

/*
    For table inheritance support.

    When adding a parent table to a table,
    the two tables must have at least
    one unique key in common.
*/
export type Intersect<
    ArrayA extends CandidateKey[],
    ArrayB extends CandidateKey[]
> = (
    ExtractEqual<
        FromCandidateKeyArray<ArrayA>,
        FromCandidateKeyArray<ArrayB>
    >
);
export function intersect<
    ArrayA extends CandidateKey[],
    ArrayB extends CandidateKey[]
> (
    arrayA : ArrayA,
    arrayB : ArrayB
) : (
    Intersect<
        ArrayA,
        ArrayB
    >[]
) {
    const result : CandidateKey[] = [];
    for (let a of arrayA) {
        for (let b of arrayB) {
            if (isEqual(a, b)) {
                result.push(a);
                break;
            }
        }
    }
    return result as any;
}