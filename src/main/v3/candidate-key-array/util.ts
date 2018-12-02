import {CandidateKey, CandidateKeyUtil} from "../candidate-key";
import {ExtractEqual} from "../type";

export namespace CandidateKeyArrayUtil {
    export type ToUnion<CandidateKeyArrayT extends CandidateKey[]> = (
        CandidateKeyArrayT[number]
    );

    /*
        For table inheritance support.

        When adding a parent table to a table,
        the two tables must have at least
        one unique key in common.

        TODO Find a better name?
    */
    export type CommonCandidateKeyUnion<
        ArrayA extends CandidateKey[],
        ArrayB extends CandidateKey[]
    > = (
        ExtractEqual<
            ToUnion<ArrayA>,
            ToUnion<ArrayB>
        >
    );
    export function hasCommonCandidateKeys (
        arrayA : CandidateKey[],
        arrayB : CandidateKey[]
    ) : boolean {
        for (let a of arrayA) {
            for (let b of arrayB) {
                if (CandidateKeyUtil.isEqual(a, b)) {
                    return true;
                }
            }
        }
        return false;
    }
    export function commonCandidateKeys<
        ArrayA extends CandidateKey[],
        ArrayB extends CandidateKey[]
    > (
        arrayA : ArrayA,
        arrayB : ArrayB
    ) : (
        CommonCandidateKeyUnion<
            ArrayA,
            ArrayB
        >[]
    ) {
        const result : CandidateKey[] = [];
        for (let a of arrayA) {
            for (let b of arrayB) {
                if (CandidateKeyUtil.isEqual(a, b)) {
                    result.push(a);
                    break;
                }
            }
        }
        return result as any;
    }
}
